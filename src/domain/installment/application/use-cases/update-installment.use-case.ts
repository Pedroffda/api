import { TransactionRepository } from '@/domain/transaction/application/repositories/transaction-repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Installment } from '../../enterprise/entities/installment.entity';
import { InstallmentRepository } from '../repositories/installment-repository';

@Injectable()
export class UpdateInstallmentUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly installmentRepository: InstallmentRepository,
  ) {}

  async execute(id: string, userId: string, updateData: Partial<Installment>) {
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

    if (updateData.transactionId) {
      const transactionExists = await this.transactionRepository.findById(
        updateData.transactionId,
      );

      if (!transactionExists) {
        throw new NotFoundException('Transaction not found');
      }

      if (transactionExists.userId !== userId) {
        throw new NotFoundException('Transaction not found');
      }
    }

    const updatedInstallment = await this.installmentRepository.update(
      id,
      updateData,
    );

    return updatedInstallment;
  }
}
