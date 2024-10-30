import { TransactionRepository } from '@/domain/transaction/application/repositories/transaction-repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InstallmentRepository } from '../repositories/installment-repository';

@Injectable()
export class DeleteInstallmentUseCase {
  constructor(
    private readonly installmentRepository: InstallmentRepository,
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async execute(id: string, userId: string): Promise<void> {
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
      throw new NotFoundException('Transaction not found');
    }

    await this.installmentRepository.delete(id);
  }
}
