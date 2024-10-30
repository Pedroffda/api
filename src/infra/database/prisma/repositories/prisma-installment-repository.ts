import { InstallmentRepository } from '@/domain/Installment/application/repositories/Installment-repository';
import { Installment } from '@/domain/Installment/enterprise/entities/Installment.entity';
import { Injectable } from '@nestjs/common';
import { PrismaInstallmentMapper } from '../mappers/prisma-installment-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaInstallmentRepository implements InstallmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(installment: Installment): Promise<void> {
    const data = PrismaInstallmentMapper.toPrisma(installment);
    await this.prisma.installment.create({ data });
  }

  async findById(id: string): Promise<Installment | null> {
    const installment = await this.prisma.installment.findFirst({
      where: {
        id,
        isActive: true,
      },
    });

    if (!installment) {
      return null;
    }

    return PrismaInstallmentMapper.toDomain(installment);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.installment.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        isActive: false,
      },
    });
  }

  async update(
    id: string,
    updateData: Partial<Installment>,
  ): Promise<Installment> {
    const updatedInstallment = await this.prisma.installment.update({
      where: { id, isActive: true },
      data: updateData,
    });
    return PrismaInstallmentMapper.toDomain(updatedInstallment);
  }

  async findAll(userId: string): Promise<Installment[]> {
    const installments = await this.prisma.installment.findMany({
      where: {
        transaction: {
          userId,
        },
        isActive: true,
      },
    });

    return PrismaInstallmentMapper.toDomainList(installments);
  }
}
