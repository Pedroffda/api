import { Injectable } from '@nestjs/common';
import { InstallmentRepository } from '../repositories/installment-repository';

@Injectable()
export class GetAllInstallmentsUseCase {
  constructor(private readonly installmentRepository: InstallmentRepository) {}

  async execute(userId: string) {
    const transactions = await this.installmentRepository.findAll(userId);
    return transactions;
  }
}
