import { GetAllUsersUseCase } from '@/domain/user/application/use-cases/get-all-users.use-case';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class GetAllUsersController {
  constructor(private readonly getAllUsersUseCase: GetAllUsersUseCase) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAllUsers(@CurrentUser() user: UserPayload) {
    return await this.getAllUsersUseCase.execute(user);
  }
}
