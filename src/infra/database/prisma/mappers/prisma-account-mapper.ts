import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Account } from '@/domain/account/enterprise/entities/account.entity';
import { Prisma, Account as PrismaAccount } from '@prisma/client';

export class PrismaAccountMapper {
  static toPrisma(account: Account): Prisma.AccountCreateInput {
    return {
      id: account.id,
      name: account.name,
      user: {
        connect: {
          id: account.userId,
        },
      },
      createdAt: account.createdAt,
      description: account.description,
      isActive: account.isActive,
      deletedAt: account.deletedAt,
      updatedAt: account.updatedAt,
    };
  }

  static toDomain(raw: PrismaAccount): Account {
    return Account.create(
      {
        name: raw.name,
        description: raw.description ?? undefined,
        userId: raw.userId,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt,
        isActive: raw.isActive,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toDomainList(raw: PrismaAccount[]): Account[] {
    return raw.map((account) => this.toDomain(account));
  }
}
