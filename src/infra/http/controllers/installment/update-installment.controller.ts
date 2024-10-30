import { UpdateInstallmentUseCase } from '@/domain/installment/application/use-cases/update-installment.use-case';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Installment } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

const updateInstallmentDto = z
  .object({
    amount: z.number().optional(),
    dueDate: z.string().optional(),
    status: z.string().optional(),
  })
  .strict();

export type UpdateInstallmentDto = z.infer<typeof updateInstallmentDto>;

@Controller('transactions')
export class UpdateInstallmentController {
  constructor(
    private readonly updateInstallmentUseCase: UpdateInstallmentUseCase,
  ) {}

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateInstallment(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateInstallmentDto))
    body: UpdateInstallmentDto,
    @CurrentUser() user: UserPayload,
  ) {
    const { amount, ...rest } = body;

    return await this.updateInstallmentUseCase.execute(id, user.sub, {
      ...rest,
      amount: amount ? new Decimal(amount) : undefined,
      dueDate: rest.dueDate ? new Date(rest.dueDate).toISOString() : undefined,
    } as Partial<Installment>);
  }
}
