import { DeleteUserUseCase } from '@/domain/user/application/use-cases/delete-user.use-case';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class DeleteUserController {
  constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {}

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(
    @Param('id') id: string,
    @CurrentUser() userPayload: UserPayload,
  ) {
    return await this.deleteUserUseCase.execute(id, userPayload);
  }
}
