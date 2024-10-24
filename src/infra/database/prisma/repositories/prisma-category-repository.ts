import { CategoryRepository } from '@/domain/category/application/repositories/category-repository';
import { Category } from '@/domain/category/enterprise/entities/category.entity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Category): Promise<Category> {
    const category = await this.prisma.category.create({
      data: {
        name: data.name,
        userId: data.userId,
      },
    });

    return new Category(
      category,
      category.id,
      category.createdAt,
      category.updatedAt,
    );
  }

  async findByUserId(userId: string): Promise<Category[]> {
    const categories = await this.prisma.category.findMany({
      where: { userId },
    });

    return categories.map(
      (category) =>
        new Category(
          category,
          category.id,
          category.createdAt,
          category.updatedAt,
        ),
    );
  }
}
