import { UpdateTransactionUseCase } from '@/domain/transaction/application/use-cases/update-transaction.use-case';
import {
  Transaction,
  TransactionType,
} from '@/domain/transaction/enterprise/entities/transaction.entity';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Decimal } from '@prisma/client/runtime/library';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

const updateTransactionDto = z
  .object({
    type: z.nativeEnum(TransactionType).optional(),
    amount: z.number().optional(),
    description: z.string().optional(),
    date: z.string().optional(),
    categoryId: z.string().optional(),
    accountId: z.string().optional(),
  })
  .strict();

export type UpdateTransactionDto = z.infer<typeof updateTransactionDto>;

@Controller('transactions')
export class UpdateTransactionController {
  constructor(
    private readonly updateTransactionUseCase: UpdateTransactionUseCase,
  ) {}

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateTransaction(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateTransactionDto))
    body: UpdateTransactionDto,
    @CurrentUser() user: UserPayload,
  ) {
    const { amount, ...rest } = body;

    return await this.updateTransactionUseCase.execute(id, user.sub, {
      ...rest,
      amount: amount ? new Decimal(amount) : undefined,
    } as Partial<Transaction>);
  }
}
