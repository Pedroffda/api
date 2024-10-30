import { CreateInstallmentUseCase } from '@/domain/installment/application/use-cases/create-installment.use-case';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Decimal } from '@prisma/client/runtime/library';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

const createInstallmentDto = z.object({
  amount: z.number(),
  dueDate: z.string(),
  status: z.string(),
  transactionId: z.string(),
});

type CreateInstallmentDto = z.infer<typeof createInstallmentDto>;

@Controller('installments')
export class CreateInstallmentController {
  constructor(
    private readonly createInstallmentUseCase: CreateInstallmentUseCase,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body(new ZodValidationPipe(createInstallmentDto))
    body: CreateInstallmentDto,
    @CurrentUser()
    user: UserPayload,
  ) {
    const { amount, ...rest } = body;

    return await this.createInstallmentUseCase.execute(
      {
        ...rest,
        amount: new Decimal(amount),
        dueDate: new Date(body.dueDate),
      },
      user.sub,
    );
  }
}
