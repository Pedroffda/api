import { TransactionRepository } from '@/domain/transaction/application/repositories/transaction-repository';
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

    if (transaction.userId !== userId) {
      throw new ForbiddenException('Transaction not found');
    }

    return installment;
  }
}
