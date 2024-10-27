import { CategoryRepository } from '@/domain/category/application/repositories/category-repository';
import {
  ITransactionProps,
  Transaction,
} from '@/domain/transaction/enterprise/entities/transaction.entity';
import { UserRepository } from '@/domain/user/application/repositories/user-repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionRepository } from '../repositories/transaction-repository';

@Injectable()
export class CreateTransactionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(data: ITransactionProps): Promise<Transaction> {
    const transaction = Transaction.create({
      type: data.type,
      amount: data.amount,
      description: data.description,
      date: data.date,
      userId: data.userId,
      categoryId: data.categoryId,
    });

    const userIdExists = await this.userRepository.findByUserId(
      transaction.userId,
    );

    if (!userIdExists) {
      throw new NotFoundException('User not found');
    }

    const categoryExists = await this.categoryRepository.findById(
      transaction.categoryId,
    );

    if (!categoryExists) {
      throw new NotFoundException('Category not found');
    }

    if (categoryExists.userId !== transaction.userId) {
      throw new NotFoundException('Category not found');
    }

    await this.transactionRepository.create(transaction);

    return transaction;
  }
}
