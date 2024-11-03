import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  Transaction,
  TransactionType,
} from '@/domain/transaction/enterprise/entities/transaction.entity';
import { Prisma, Transaction as PrismaTransaction } from '@prisma/client';

export class PrismaTransactionMapper {
  static toPrisma(transaction: Transaction): Prisma.TransactionCreateInput {
    return {
      id: transaction.id,
      amount: transaction.amount,
      type: transaction.type,
      date: transaction.date ? new Date(transaction.date) : new Date(),
      category: {
        connect: { id: transaction.categoryId },
      },
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt ?? undefined,
      description: transaction.description,
      account: {
        connect: { id: transaction.accountId },
      },
      isActive: true,
    };
  }

  static toDomain(raw: PrismaTransaction): Transaction {
    return Transaction.create(
      {
        type: raw.type as TransactionType,
        amount: raw.amount ?? 0,
        date: raw.date.toISOString(),
        description: raw.description ?? undefined,
        createdAt: raw.createdAt ?? new Date(),
        updatedAt: raw.updatedAt,
        accountId: raw.accountId,
        categoryId: raw.categoryId ?? '',
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toDomainList(raw: PrismaTransaction[]): Transaction[] {
    return raw.map((category) => this.toDomain(category));
  }
}
