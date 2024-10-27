import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Category } from '@/domain/category/enterprise/entities/category.entity';
import { Prisma, Category as PrismaCategory } from '@prisma/client';

export class PrismaCategoryMapper {
  static toPrisma(category: Category): Prisma.CategoryCreateInput {
    return {
      id: category.id,
      name: category.name,
      description: category.description,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt ?? undefined,
      user: {
        connect: { id: category.userId },
      },
    };
  }

  static toDomain(raw: PrismaCategory): Category {
    return Category.create(
      {
        name: raw.name,
        description: raw.description ?? undefined,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        userId: raw.userId,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toDomainList(raw: PrismaCategory[]): Category[] {
    return raw.map((category) => this.toDomain(category));
  }
}
