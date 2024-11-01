import { AccountRepository } from '@/domain/account/application/repositories/account-repository';
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
    private readonly accountRepository: AccountRepository,
  ) {}

  async execute(data: ITransactionProps): Promise<Transaction> {
    const transaction = Transaction.create({
      type: data.type,
      amount: data.amount,
      description: data.description,
      date: data.date,
      categoryId: data.categoryId,
      accountId: data.accountId,
    });

    const accountExists = await this.accountRepository.findById(data.accountId);

    if (!accountExists) {
      throw new NotFoundException('Account not found');
    }

    const userExists = await this.userRepository.findByUserId(
      accountExists.userId,
    );

    console.log(userExists);

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    const categoryExists = await this.categoryRepository.findById(
      transaction.categoryId,
    );

    console.log(categoryExists);

    if (!categoryExists) {
      throw new NotFoundException('Category not found');
    }

    await this.transactionRepository.create(transaction);

    return transaction;
  }
}
