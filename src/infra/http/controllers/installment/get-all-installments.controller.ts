import { GetAllInstallmentsUseCase } from '@/domain/installment/application/use-cases/get-all-installments.use-case';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('installments')
export class GetAllInstallmentsController {
  constructor(
    private readonly getAllInstallsmentUseCase: GetAllInstallmentsUseCase,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAllInstallment(@CurrentUser() user: UserPayload) {
    return await this.getAllInstallsmentUseCase.execute(user.sub);
  }
}
