import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AccountRepository } from '../repositories/account-repository';

@Injectable()
export class GetAccountUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(id: string, userId: string) {
    const account = await this.accountRepository.findById(id);
    if (!account) {
      throw new NotFoundException('account not found');
    }
    if (account.userId !== userId) {
      throw new ForbiddenException(
        'You are not allowed to access this account',
      );
    }

    return account;
  }
}
