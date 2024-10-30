import { DeleteInstallmentUseCase } from '@/domain/installment/application/use-cases/delete-installment.use-case';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('installments')
export class DeleteInstallmentController {
  constructor(
    private readonly deleteInstallmentUseCase: DeleteInstallmentUseCase,
  ) {}

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteInstallment(
    @Param('id') id: string,
    @CurrentUser() user: UserPayload,
  ) {
    return await this.deleteInstallmentUseCase.execute(id, user.sub);
  }
}
