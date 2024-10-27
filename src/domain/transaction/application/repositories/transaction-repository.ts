import { Transaction } from '../../enterprise/entities/transaction.entity';

export abstract class TransactionRepository {
  abstract create(category: Transaction): Promise<void>;
  abstract findById(id: string): Promise<Transaction | null>;
  abstract update(
    id: string,
    updateData: Partial<Transaction>,
  ): Promise<Transaction>;
  abstract delete(id: string): Promise<void>;
  abstract findAll(userId: string): Promise<Transaction[]>;
}
