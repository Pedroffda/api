import { AccountRepository } from '@/domain/account/application/repositories/account-repository';
import { TransactionRepository } from '@/domain/transaction/application/repositories/transaction-repository';
import { UserRepository } from '@/domain/user/application/repositories/user-repository';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InstallmentRepository } from '../repositories/installment-repository';

@Injectable()
export class GetInstallmentUseCase {
  constructor(
    private readonly installmentRepository: InstallmentRepository,
    private readonly transactionRepository: TransactionRepository,
    private readonly userRepository: UserRepository,
    private readonly accountRepository: AccountRepository,
  ) {}

  async execute(id: string, userId: string) {
    const installment = await this.installmentRepository.findById(id);

    if (!installment) {
      throw new NotFoundException('Installment not found');
    }

    const transaction = await this.transactionRepository.findById(
      installment.transactionId,
    );

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    const account = await this.accountRepository.findById(
      transaction.accountId,
    );

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    if (account.userId !== userId) {
      throw new ForbiddenException('Account not found');
    }

    return installment;
  }
}
