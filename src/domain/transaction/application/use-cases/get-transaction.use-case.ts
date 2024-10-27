import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TransactionRepository } from '../repositories/transaction-repository';

@Injectable()
export class GetTransactionUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(id: string, userId: string) {
    const transaction = await this.transactionRepository.findById(id);
    if (!transaction) {
      throw new NotFoundException('transaction not found');
    }
    if (transaction.userId !== userId) {
      throw new ForbiddenException(
        'You are not allowed to access this transaction',
      );
    }

    return transaction;
  }
}
