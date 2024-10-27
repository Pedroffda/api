import { CategoryRepository } from '@/domain/category/application/repositories/category-repository';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Transaction } from '../../enterprise/entities/transaction.entity';
import { TransactionRepository } from '../repositories/transaction-repository';

@Injectable()
export class UpdateTransactionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(id: string, userId: string, updateData: Partial<Transaction>) {
    const transaction = await this.transactionRepository.findById(id);

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    if (transaction.userId !== userId) {
      throw new ForbiddenException(
        'You are not allowed to update this Transaction',
      );
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

    const updatedTransaction = await this.transactionRepository.update(
      id,
      updateData,
    );

    return updatedTransaction;
  }
}
