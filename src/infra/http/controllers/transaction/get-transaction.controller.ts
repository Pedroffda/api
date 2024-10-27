import { GetTransactionUseCase } from '@/domain/transaction/application/use-cases/get-transaction.use-case';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('transactions')
export class GetTransactionController {
  constructor(private readonly getTransactionUseCase: GetTransactionUseCase) {}

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getTransaction(
    @Param('id') id: string,
    @CurrentUser() user: UserPayload,
  ) {
    return await this.getTransactionUseCase.execute(id, user.sub);
  }
}
