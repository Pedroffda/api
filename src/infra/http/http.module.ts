import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthenticateController } from './controllers/authenticate.controller';
import { CreateAccountController } from './controllers/create-account.controller';
import { CreateCategoryController } from './controllers/create-category.controller';
import { GetAllCategoriesController } from './controllers/get-all-categories.controler';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateAccountController,
    CreateCategoryController,
    GetAllCategoriesController,
  ],
  providers: [],
})
export class HttpModule {}
