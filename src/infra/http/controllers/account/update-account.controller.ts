import { UpdateAccountUseCase } from '@/domain/account/application/use-cases/update-account.use-case';
import { Account } from '@/domain/account/enterprise/entities/account.entity';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

const updateAccountDto = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
  })
  .strict();

export type UpdateAccountDto = z.infer<typeof updateAccountDto>;

@Controller('transactions')
export class UpdateAccountController {
  constructor(private readonly updateAccountUseCase: UpdateAccountUseCase) {}

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateAccount(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateAccountDto))
    body: UpdateAccountDto,
    @CurrentUser() user: UserPayload,
  ) {
    return await this.updateAccountUseCase.execute(id, user.sub, {
      ...body,
    } as Partial<Account>);
  }
}
