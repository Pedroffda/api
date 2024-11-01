import { TransactionRepository } from '@/domain/transaction/application/repositories/transaction-repository';
import { UserRepository } from '@/domain/user/application/repositories/user-repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  IInstallmentProps,
  Installment,
} from '../../enterprise/entities/installment.entity';
import { InstallmentRepository } from '../repositories/installment-repository';

@Injectable()
export class CreateInstallmentUseCase {
  constructor(
    private readonly InstallmentRepository: InstallmentRepository,
    private readonly transactionRepository: TransactionRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(data: IInstallmentProps, userId: string): Promise<Installment> {
    const installment = Installment.create({
      amount: data.amount,
      dueDate: data.dueDate,
      status: data.status,
      transactionId: data.transactionId,
    });

    const transactionExists = await this.transactionRepository.findById(
      installment.transactionId,
    );

    if (!transactionExists) {
      throw new NotFoundException('Transaction not found');
    }

    const userExists = await this.userRepository.findByUserId(userId);

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    await this.InstallmentRepository.create(installment);

    return installment;
  }
}
