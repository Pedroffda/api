import { Account } from '../../enterprise/entities/account.entity';

export abstract class AccountRepository {
  abstract create(account: Account): Promise<void>;
  abstract findById(id: string): Promise<Account | null>;
  abstract update(id: string, updateData: Partial<Account>): Promise<Account>;
  abstract delete(id: string): Promise<void>;
  abstract findAll(userId: string): Promise<Account[]>;
}
