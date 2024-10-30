import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Installment } from '@/domain/installment/enterprise/entities/installment.entity';
import { Prisma, Installment as PrismaInstallment } from '@prisma/client';

export class PrismaInstallmentMapper {
  static toPrisma(transaction: Installment): Prisma.InstallmentCreateInput {
    return {
      id: transaction.id,
      amount: transaction.amount,
      dueDate: transaction.dueDate,
      status: transaction.status,
      transaction: {
        connect: { id: transaction.transactionId },
      },
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt ?? undefined,
      isActive: true,
    };
  }

  static toDomain(raw: PrismaInstallment): Installment {
    return Installment.create(
      {
        amount: raw.amount,
        dueDate: raw.dueDate,
        status: raw.status,
        transactionId: raw.transactionId,
        createdAt: raw.createdAt ?? new Date(),
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toDomainList(raw: PrismaInstallment[]): Installment[] {
    return raw.map((category) => this.toDomain(category));
  }
}
