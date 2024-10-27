import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../repositories/transaction-repository';

@Injectable()
export class GetAllTransactionsUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(userId: string) {
    const transactions = await this.transactionRepository.findAll(userId);
    return transactions;
  }
}
