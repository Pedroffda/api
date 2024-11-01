import { DeleteAccountUseCase } from '@/domain/account/application/use-cases/delete-account.use-case';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('accounts')
export class DeleteAccountController {
  constructor(private readonly deleteAccountUseCase: DeleteAccountUseCase) {}

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteAccount(
    @Param('id') id: string,
    @CurrentUser() user: UserPayload,
  ) {
    return await this.deleteAccountUseCase.execute(id, user.sub);
  }
}
