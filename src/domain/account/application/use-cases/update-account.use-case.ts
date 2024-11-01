import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Account } from '../../enterprise/entities/account.entity';
import { AccountRepository } from '../repositories/account-repository';

@Injectable()
export class UpdateAccountUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(id: string, userId: string, updateData: Partial<Account>) {
    const account = await this.accountRepository.findById(id);

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    if (account.userId !== userId) {
      throw new ForbiddenException(
        'You are not allowed to update this Account',
      );
    }

    const updatedAccount = await this.accountRepository.update(id, updateData);

    return updatedAccount;
  }
}
