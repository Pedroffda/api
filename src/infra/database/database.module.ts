import { CategoryRepository } from '@/domain/category/application/repositories/category-repository';
import { TransactionRepository } from '@/domain/transaction/application/repositories/transaction-repository';
import { UserRepository } from '@/domain/user/application/repositories/user-repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaCategoryRepository } from './prisma/repositories/prisma-category-repository';
import { PrismaTransactionRepository } from './prisma/repositories/prisma-transaction-repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: CategoryRepository,
      useClass: PrismaCategoryRepository,
    },
    {
      provide: TransactionRepository,
      useClass: PrismaTransactionRepository,
    },
  ],
  exports: [
    PrismaService,
    UserRepository,
    CategoryRepository,
    TransactionRepository,
  ],
})
export class DatabaseModule {}
