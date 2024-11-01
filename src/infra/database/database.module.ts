import { AccountRepository } from '@/domain/account/application/repositories/account-repository';
import { CategoryRepository } from '@/domain/category/application/repositories/category-repository';
import { InstallmentRepository } from '@/domain/installment/application/repositories/installment-repository';
import { TransactionRepository } from '@/domain/transaction/application/repositories/transaction-repository';
import { UserRepository } from '@/domain/user/application/repositories/user-repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAccountRepository } from './prisma/repositories/prisma-account-repository';
import { PrismaCategoryRepository } from './prisma/repositories/prisma-category-repository';
import { PrismaInstallmentRepository } from './prisma/repositories/prisma-installment-repository';
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
    {
      provide: InstallmentRepository,
      useClass: PrismaInstallmentRepository,
    },
    {
      provide: AccountRepository,
      useClass: PrismaAccountRepository,
    },
  ],
  exports: [
    PrismaService,
    UserRepository,
    CategoryRepository,
    TransactionRepository,
    InstallmentRepository,
    AccountRepository,
  ],
})
export class DatabaseModule {}
