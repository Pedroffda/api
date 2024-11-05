import { TransactionRepository } from '@/domain/Transaction/application/repositories/Transaction-repository';
import { Transaction } from '@/domain/Transaction/enterprise/entities/Transaction.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
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
      include: {
        category: true,
      },
    });

    if (!transaction) {
      return null;
    }

    return PrismaTransactionMapper.toDomain(transaction as any);
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
    // Optionally, verify that the transaction is active before updating
    const existingTransaction = await this.findById(id);
    if (!existingTransaction) {
      throw new NotFoundException(
        `Transaction with id ${id} not found or inactive.`,
      );
    }

    const updatedTransaction = await this.prisma.transaction.update({
      where: { id },
      data: updateData as any,
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
      include: {
        category: true,
      },
    });
    console.log(transactions);

    return PrismaTransactionMapper.toDomainList(transactions);

    // return PrismaTransactionMapper.toDomainList(transactions);
  }
}
