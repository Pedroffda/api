import { CreateUserUseCase } from '@/domain/user/application/use-cases/create-user.use-case';
import { DeleteUserUseCase } from '@/domain/user/application/use-cases/delete-user.use-case';
import { GetAllUsersUseCase } from '@/domain/user/application/use-cases/get-all-users.use-case';
import { GetUserUseCase } from '@/domain/user/application/use-cases/get-user.use-case';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthenticateController } from './controllers/auth/authenticate.controller';
import { CryptographyModule } from './controllers/cryptography/cryptography.module';
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
  ],
  providers: [
    CreateUserUseCase,
    GetUserUseCase,
    GetAllUsersUseCase,
    DeleteUserUseCase,
  ],
})
export class HttpModule {}
