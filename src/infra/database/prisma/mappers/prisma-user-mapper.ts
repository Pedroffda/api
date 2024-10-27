import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { User } from '@/domain/user/enterprise/entities/user.entity';
import { Prisma, User as PrismaUser } from '@prisma/client';

export class PrismaUserMapper {
  static toDomain(row: PrismaUser): User {
    return User.create(
      {
        name: row.name,
        email: row.email,
        password: row.password,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      },
      new UniqueEntityID(row.id),
    );
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      email: user.email,
      name: user.name,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt || undefined,
    };
  }
}
