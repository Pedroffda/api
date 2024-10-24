import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthenticateController } from './controllers/authenticate.controller';
import { UserController } from './controllers/user/user.controller';
import { CryptographyModule } from './controllers/cryptography/cryptography.module';
import { CreateUserUseCase } from '@/domain/user/application/use-cases/create-user';
import { FindUserUseCase } from '@/domain/user/application/use-cases/find-user';
import { HashGenerator } from '@/domain/user/cryptography/hash-generator';
import { GetAllUserUseCase } from '@/domain/user/application/use-cases/get-all-user';
// import { CreateAccountController } from './controllers/create-account.controller';
// import { CreateCategoryController } from './controllers/create-category.controller';
// import { GetAllCategoriesController } from './controllers/get-all-categories.controler';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    // CreateAccountController,
    // AuthenticateController,
    // CreateAccountController,
    // CreateCategoryController,
    // GetAllCategoriesController,
    UserController,
  ],
  providers: [CreateUserUseCase, FindUserUseCase, GetAllUserUseCase],
})
export class HttpModule {}
