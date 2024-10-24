import { User } from '../../enterprise/entities/user.entity';

export abstract class UserRepository {
  abstract create(data: User): Promise<User>;
  abstract findByUserEmail(email: string): Promise<User | null>;
  abstract delete(id: string): Promise<void>;
  abstract update(id: string, data: User): Promise<User>;
  abstract findByUserId(userId: string): Promise<User | null>;
  abstract findAll(): Promise<Partial<User>[]>;
}
