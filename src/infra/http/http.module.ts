import { CreateCategoryUseCase } from '@/domain/category/application/use-cases/create-category.use-case';
import { DeleteCategoryUseCase } from '@/domain/category/application/use-cases/delete-category.use-case';
import { GetAllCategoriesUseCase } from '@/domain/category/application/use-cases/get-all-categories.use-case';
import { GetCategoryUseCase } from '@/domain/category/application/use-cases/get-category.use-case';
import { UpdateCategoryUseCase } from '@/domain/category/application/use-cases/update-category.use-case';
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
  ],
})
export class HttpModule {}
