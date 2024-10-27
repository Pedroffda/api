import { CategoryRepository } from '@/domain/category/application/repositories/category-repository';
import { Category } from '@/domain/category/enterprise/entities/category.entity';
import { Injectable } from '@nestjs/common';
import { PrismaCategoryMapper } from '../mappers/prisma-category-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(category: Category): Promise<void> {
    const data = PrismaCategoryMapper.toPrisma(category);
    await this.prisma.category.create({ data });
  }

  async findByName(name: string): Promise<Category | null> {
    const category = await this.prisma.category.findFirst({
      where: {
        name,
        isActive: true,
      },
    });

    if (!category) {
      return null;
    }

    return PrismaCategoryMapper.toDomain(category);
  }

  async findById(id: string): Promise<Category | null> {
    const category = await this.prisma.category.findFirst({
      where: {
        id,
        isActive: true,
      },
    });

    if (!category) {
      return null;
    }

    return PrismaCategoryMapper.toDomain(category);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.category.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        isActive: false,
      },
    });
  }

  async update(id: string, category: Category): Promise<Category> {
    const data = PrismaCategoryMapper.toPrisma(category);
    const updatedCategory = await this.prisma.category.update({
      where: { id },
      data,
    });
    return PrismaCategoryMapper.toDomain(updatedCategory);
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany({
      where: {
        isActive: true,
      },
    });

    return PrismaCategoryMapper.toDomainList(categories);
  }
}
