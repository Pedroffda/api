import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from 'src/env';
import { AuthModule } from './auth/auth.module';
import { AuthenticateController } from './controllers/authenticate.controller';
import { CreateAccountController } from './controllers/create-account.controller';
// import { CreateTransactionsController } from './controllers/create-transaction.controller';
import { CreateCategoryController } from './controllers/create-category.controller';
import { GetAllCategoriesController } from './controllers/get-all-categories.controler';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    // CreateTransactionsController,
    CreateCategoryController,
    GetAllCategoriesController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
