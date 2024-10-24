import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserRepository } from '@/domain/user/application/repositories/user-repository';
import { User } from '@/domain/user/enterprise/entities/user.entity';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: User): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });

    return new User({
      name: user.name ?? '',
      email: user.email,
      password: user.password,
    });
  }

  async findByUserEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return new User({
      name: user.name ?? '',
      email: user.email,
      password: user.password,
    });
  }

  async findByUserId(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return new User({
      name: user.name ?? '',
      email: user.email,
      password: user.password,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  async update(id: string, data: User): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });

    return new User({
      name: user.name ?? '',
      email: user.email,
      password: user.password,
    });
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    return users.map((user) => {
      return new User({
        name: user.name ?? '',
        email: user.email,
        password: user.password,
      });
    });
  }
}
