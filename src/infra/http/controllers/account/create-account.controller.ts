import { CreateAccountUseCase } from '@/domain/account/application/use-cases/create-account.use-case';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

const createAccountDto = z.object({
  name: z.string(),
  description: z.string().optional(),
});

type CreateAccountDto = z.infer<typeof createAccountDto>;

@Controller('accounts')
export class CreateAccountController {
  constructor(private readonly createAccountUseCase: CreateAccountUseCase) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body(new ZodValidationPipe(createAccountDto))
    body: CreateAccountDto,
    @CurrentUser() user: UserPayload,
  ) {
    return await this.createAccountUseCase.execute({
      ...body,
      userId: user.sub,
    });
  }
}
