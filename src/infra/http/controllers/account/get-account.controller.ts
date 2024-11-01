import { GetAccountUseCase } from '@/domain/account/application/use-cases/get-account.use-case';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('accounts')
export class GetAccountController {
  constructor(private readonly getAccountUseCase: GetAccountUseCase) {}

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getAccount(@Param('id') id: string, @CurrentUser() user: UserPayload) {
    return await this.getAccountUseCase.execute(id, user.sub);
  }
}
