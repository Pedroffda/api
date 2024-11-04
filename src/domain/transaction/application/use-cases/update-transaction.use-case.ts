import { AccountRepository } from '@/domain/account/application/repositories/account-repository';
import { CategoryRepository } from '@/domain/category/application/repositories/category-repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Transaction } from '../../enterprise/entities/transaction.entity';
import { TransactionRepository } from '../repositories/transaction-repository';

@Injectable()
export class UpdateTransactionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly accountRepository: AccountRepository,
  ) {}

  async execute(id: string, userId: string, updateData: Partial<Transaction>) {
    const transaction = await this.transactionRepository.findById(id);

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
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

    if (updateData.categoryId) {
      const category = await this.categoryRepository.findById(
        updateData.categoryId,
      );

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      if (category.userId !== userId) {
        throw new NotFoundException('Category not found');
      }
    }

    // Format date to ISO string if it exists
    if (updateData.date) {
      updateData.date = new Date(updateData.date).toISOString(); // Ensure ISO-8601 format
    }

    const updatedTransaction = await this.transactionRepository.update(
      id,
      updateData,
    );

    return updatedTransaction;
  }
}
