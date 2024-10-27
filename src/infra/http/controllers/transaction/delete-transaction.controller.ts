import { DeleteTransactionUseCase } from '@/domain/transaction/application/use-cases/delete-transaction.use-case';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('transactions')
export class DeleteTransactionController {
  constructor(
    private readonly deleteTransactionUseCase: DeleteTransactionUseCase,
  ) {}

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteTransaction(
    @Param('id') id: string,
    @CurrentUser() user: UserPayload,
  ) {
    return await this.deleteTransactionUseCase.execute(id, user.sub);
  }
}
