import { CreateCategoryUseCase } from '@/domain/category/application/use-cases/create-category.use-case';
import { DeleteCategoryUseCase } from '@/domain/category/application/use-cases/delete-category.use-case';
import { GetAllCategoriesUseCase } from '@/domain/category/application/use-cases/get-all-categories.use-case';
import { GetCategoryUseCase } from '@/domain/category/application/use-cases/get-category.use-case';
import { UpdateCategoryUseCase } from '@/domain/category/application/use-cases/update-category.use-case';
import { CreateInstallmentUseCase } from '@/domain/installment/application/use-cases/create-installment.use-case';
import { DeleteInstallmentUseCase } from '@/domain/installment/application/use-cases/delete-installment.use-case';
import { GetAllInstallmentsUseCase } from '@/domain/installment/application/use-cases/get-all-installments.use-case';
import { GetInstallmentUseCase } from '@/domain/installment/application/use-cases/get-installment.use-case';
import { UpdateInstallmentUseCase } from '@/domain/installment/application/use-cases/update-installment.use-case';
import { CreateTransactionUseCase } from '@/domain/transaction/application/use-cases/create-transaction.use-case';
import { DeleteTransactionUseCase } from '@/domain/transaction/application/use-cases/delete-transaction.use-case';
import { GetAllTransactionsUseCase } from '@/domain/transaction/application/use-cases/get-all-transactions.use-case';
import { GetTransactionUseCase } from '@/domain/transaction/application/use-cases/get-transaction.use-case';
import { UpdateTransactionUseCase } from '@/domain/transaction/application/use-cases/update-transaction.use-case';
import { CreateUserUseCase } from '@/domain/user/application/use-cases/create-user.use-case';
import { DeleteUserUseCase } from '@/domain/user/application/use-cases/delete-user.use-case';
import { GetAllUsersUseCase } from '@/domain/user/application/use-cases/get-all-users.use-case';
import { GetUserUseCase } from '@/domain/user/application/use-cases/get-user.use-case';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthenticateController } from './controllers/auth/authenticate.controller';
import { CreateCategoryController } from './controllers/category/create-category.controller';
import { DeleteCategoryController } from './controllers/category/delete-category.controller';
import { GetAllCategoriesController } from './controllers/category/get-all-categories.controller';
import { GetCategoryController } from './controllers/category/get-category.controller';
import { UpdateCategoryController } from './controllers/category/update-category.controller';
import { CryptographyModule } from './controllers/cryptography/cryptography.module';
import { CreateInstallmentController } from './controllers/installment/create-installment.controller';
import { DeleteInstallmentController } from './controllers/installment/delete-installment.controller';
import { GetAllInstallmentsController } from './controllers/installment/get-all-installments.controller';
import { GetInstallmentController } from './controllers/installment/get-installment.controller';
import { UpdateInstallmentController } from './controllers/installment/update-installment.controller';
import { CreateTransactionController } from './controllers/transaction/create-transaction.controller';
import { DeleteTransactionController } from './controllers/transaction/delete-transaction.controller';
import { GetAllTransactionsController } from './controllers/transaction/get-all-transaction.controller';
import { GetTransactionController } from './controllers/transaction/get-transaction.controller';
import { UpdateTransactionController } from './controllers/transaction/update-transaction.controller';
import { CreateUserController } from './controllers/user/create-user.controller';
import { DeleteUserController } from './controllers/user/delete-user.controller';
import { GetAllUsersController } from './controllers/user/get-all-users.controller';
import { GetUserController } from './controllers/user/get-user.controller';
@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    AuthenticateController,

    CreateUserController,
    GetAllUsersController,
    GetUserController,
    DeleteUserController,

    CreateCategoryController,
    GetAllCategoriesController,
    GetCategoryController,
    DeleteCategoryController,
    UpdateCategoryController,

    CreateTransactionController,
    GetAllTransactionsController,
    GetTransactionController,
    UpdateTransactionController,
    DeleteTransactionController,

    CreateInstallmentController,
    GetAllInstallmentsController,
    GetInstallmentController,
    UpdateInstallmentController,
    DeleteInstallmentController,
  ],
  providers: [
    CreateUserUseCase,
    GetUserUseCase,
    GetAllUsersUseCase,
    DeleteUserUseCase,

    CreateCategoryUseCase,
    GetAllCategoriesUseCase,
    GetCategoryUseCase,
    DeleteCategoryUseCase,
    UpdateCategoryUseCase,

    CreateTransactionUseCase,
    GetAllTransactionsUseCase,
    GetTransactionUseCase,
    UpdateTransactionUseCase,
    DeleteTransactionUseCase,

    CreateInstallmentUseCase,
    GetAllInstallmentsUseCase,
    GetInstallmentUseCase,
    UpdateInstallmentUseCase,
    DeleteInstallmentUseCase,
  ],
})
export class HttpModule {}
