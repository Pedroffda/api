import { AccountRepository } from '@/domain/account/application/repositories/account-repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionRepository } from '../repositories/transaction-repository';

@Injectable()
export class GetTransactionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly accountRepository: AccountRepository,
  ) {}

  async execute(id: string, userId: string) {
    const transaction = await this.transactionRepository.findById(id);
    if (!transaction) {
      throw new NotFoundException('transaction not found');
    }

    const account = await this.accountRepository.findById(
      transaction.accountId,
    );

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    if (account.userId !== userId) {
      throw new NotFoundException('Account not found');
    }

    return transaction;
  }
}
