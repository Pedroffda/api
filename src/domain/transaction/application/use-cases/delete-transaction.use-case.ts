import { AccountRepository } from '@/domain/account/application/repositories/account-repository';
import { UserRepository } from '@/domain/user/application/repositories/user-repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionRepository } from '../repositories/transaction-repository';

@Injectable()
export class DeleteTransactionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly userRepository: UserRepository,
    private readonly accountRepository: AccountRepository,
  ) {}

  async execute(id: string, userId: string): Promise<void> {
    const transaction = await this.transactionRepository.findById(id);

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    const userExists = await this.userRepository.findByUserId(userId);

    if (!userExists) {
      throw new NotFoundException('User not found');
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

    await this.transactionRepository.delete(id);
  }
}
