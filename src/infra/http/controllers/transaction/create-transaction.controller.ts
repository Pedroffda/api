import { CreateTransactionUseCase } from '@/domain/transaction/application/use-cases/create-transaction.use-case';
import { TransactionType } from '@/domain/transaction/enterprise/entities/transaction.entity';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Decimal } from '@prisma/client/runtime/library';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

const createTransactionDto = z.object({
  type: z.nativeEnum(TransactionType),
  amount: z.number(),
  description: z.string().optional(),
  date: z.string(),
  categoryId: z.string(),
});

type CreateTransactionDto = z.infer<typeof createTransactionDto>;

@Controller('transactions')
export class CreateTransactionController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body(new ZodValidationPipe(createTransactionDto))
    body: CreateTransactionDto,
    @CurrentUser() user: UserPayload,
  ) {
    const { amount, ...rest } = body;

    console.log('body', body);

    return await this.createTransactionUseCase.execute({
      ...rest,
      amount: new Decimal(amount),
      userId: user.sub,
    });
  }
}
