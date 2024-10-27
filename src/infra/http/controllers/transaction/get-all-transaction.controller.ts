import { GetAllTransactionsUseCase } from '@/domain/transaction/application/use-cases/get-all-transactions.use-case';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('transactions')
export class GetAllTransactionsController {
  constructor(
    private readonly getAllTransactionsUseCase: GetAllTransactionsUseCase,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAllTransactions(@CurrentUser() user: UserPayload) {
    return await this.getAllTransactionsUseCase.execute(user.sub);
  }
}
