import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AccountRepository } from '../repositories/account-repository';

@Injectable()
export class DeleteAccountUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(id: string, userId: string): Promise<void> {
    const account = await this.accountRepository.findById(id);

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    if (account.userId !== userId) {
      throw new ForbiddenException('You can only delete your own accounts');
    }

    await this.accountRepository.delete(id);
  }
}
