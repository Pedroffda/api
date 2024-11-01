import { TransactionRepository } from '@/domain/Transaction/application/repositories/Transaction-repository';
import { Transaction } from '@/domain/Transaction/enterprise/entities/Transaction.entity';
import { Injectable } from '@nestjs/common';
import { PrismaTransactionMapper } from '../mappers/prisma-Transaction-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaTransactionRepository implements TransactionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(transaction: Transaction): Promise<void> {
    const data = PrismaTransactionMapper.toPrisma(transaction);
    await this.prisma.transaction.create({ data });
  }

  async findById(id: string): Promise<Transaction | null> {
    const transaction = await this.prisma.transaction.findFirst({
      where: {
        id,
        isActive: true,
      },
    });

    if (!transaction) {
      return null;
    }

    return PrismaTransactionMapper.toDomain(transaction);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.transaction.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        isActive: false,
      },
    });
  }

  async update(
    id: string,
    updateData: Partial<Transaction>,
  ): Promise<Transaction> {
    const updatedTransaction = await this.prisma.transaction.update({
      where: { id, isActive: true },
      data: updateData,
    });
    return PrismaTransactionMapper.toDomain(updatedTransaction);
  }

  async findAll(userId: string): Promise<Transaction[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        account: {
          userId,
        },
        isActive: true,
      },
    });

    return PrismaTransactionMapper.toDomainList(transactions);
  }
}
