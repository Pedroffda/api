import { GetInstallmentUseCase } from '@/domain/installment/application/use-cases/get-installment.use-case';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('installments')
export class GetInstallmentController {
  constructor(private readonly getInstallmentUseCase: GetInstallmentUseCase) {}

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getInstallment(
    @Param('id') id: string,
    @CurrentUser() user: UserPayload,
  ) {
    return await this.getInstallmentUseCase.execute(id, user.sub);
  }
}
