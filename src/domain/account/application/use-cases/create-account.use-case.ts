import { UserRepository } from '@/domain/user/application/repositories/user-repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  Account,
  IAccountProps,
} from '../../enterprise/entities/account.entity';
import { AccountRepository } from '../repositories/account-repository';

@Injectable()
export class CreateAccountUseCase {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(data: IAccountProps): Promise<Account> {
    const account = Account.create({
      ...data,
      createdAt: new Date(),
      isActive: true,
    });

    const userIdExists = await this.userRepository.findByUserId(account.userId);

    if (!userIdExists) {
      throw new NotFoundException('User not found');
    }

    await this.accountRepository.create(account);

    return account;
  }
}
