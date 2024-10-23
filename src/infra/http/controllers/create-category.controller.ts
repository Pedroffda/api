import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { PrismaService } from '@/infra/prisma/prisma.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { z } from 'zod';

const createCategoryBodySchema = z.object({
  name: z.string(),
});

type CreateCategoryBodySchema = z.infer<typeof createCategoryBodySchema>;

@Controller('/categories')
@UseGuards(AuthGuard('jwt'))
export class CreateCategoryController {
  constructor(private readonly prisma: PrismaService) {}
  @Post()
  async createCategory(
    @Body(new ZodValidationPipe(createCategoryBodySchema))
    body: CreateCategoryBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { name } = body;

    const userId = user.sub;

    await this.prisma.category.create({
      data: {
        userId,
        name,
      },
    });
  }
}
