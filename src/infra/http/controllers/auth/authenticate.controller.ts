import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { z } from 'zod';

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

@Controller('/sessions')
export class AuthenticateController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}
  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async authenticate(@Body() body: AuthenticateBodySchema) {
    const { email, password } = authenticateBodySchema.parse(body);
    const user = await this.prisma.user.findUnique({
      where: {
        email,
        isActive: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessToken = this.jwtService.sign({
      sub: user.id,
      isAdmin: user.isAdmin,
    });

    const refreshToken = this.jwtService.sign(
      {
        sub: user.id,
      },
      {
        expiresIn: '1d',
      },
    );

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  @Post('/refresh')
  async refresh(@Body() body: { refresh_token: string }) {
    const { refresh_token } = body;

    if (!refresh_token) {
      throw new BadRequestException('Invalid refresh token');
    }

    let payload;

    try {
      payload = this.jwtService.verify(refresh_token);
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const newAccessToken = this.jwtService.sign({
      sub: user.id,
      isAdmin: user.isAdmin,
    });

    return {
      access_token: newAccessToken,
    };
  }
}
