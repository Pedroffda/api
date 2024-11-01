import { GetAllAccountsUseCase } from '@/domain/account/application/use-cases/get-all-accounts.use-case';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('accounts')
export class GetAllAccountsController {
  constructor(private readonly getAllAccountsUseCase: GetAllAccountsUseCase) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAllAccounts(@CurrentUser() user: UserPayload) {
    return await this.getAllAccountsUseCase.execute(user.sub);
  }
}
