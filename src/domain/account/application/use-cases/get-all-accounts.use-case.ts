import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../repositories/account-repository';

@Injectable()
export class GetAllAccountsUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(userId: string) {
    const account = await this.accountRepository.findAll(userId);
    return account;
  }
}
