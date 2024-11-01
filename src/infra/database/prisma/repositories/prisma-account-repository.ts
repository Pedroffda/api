import { AccountRepository } from '@/domain/Account/application/repositories/Account-repository';
import { Account } from '@/domain/Account/enterprise/entities/Account.entity';
import { Injectable } from '@nestjs/common';
import { PrismaAccountMapper } from '../mappers/prisma-Account-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAccountRepository implements AccountRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(account: Account): Promise<void> {
    const data = PrismaAccountMapper.toPrisma(account);
    await this.prisma.account.create({ data });
  }

  async findById(id: string): Promise<Account | null> {
    const account = await this.prisma.account.findFirst({
      where: {
        id,
        isActive: true,
      },
    });

    if (!account) {
      return null;
    }

    return PrismaAccountMapper.toDomain(account);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.account.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        isActive: false,
      },
    });
  }

  async update(id: string, updateData: Partial<Account>): Promise<Account> {
    const data: PrismaAccountMapper = {
      name: updateData.name,
      description: updateData.description,
      isActive: updateData.isActive,
      deletedAt: updateData.deletedAt,
      updatedAt: updateData.updatedAt,
      user: updateData.userId
        ? { connect: { id: updateData.userId } }
        : undefined,
    };

    const account = await this.prisma.account.update({
      where: { id },
      data,
    });

    return PrismaAccountMapper.toDomain(account);
  }

  async findAll(userId: string): Promise<Account[]> {
    const accounts = await this.prisma.account.findMany({
      where: {
        userId: userId,
        isActive: true,
      },
    });

    return PrismaAccountMapper.toDomainList(accounts);
  }
}
