import { GetUserUseCase } from '@/domain/user/application/use-cases/get-user.use-case';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class GetUserController {
  constructor(private readonly getUserUseCase: GetUserUseCase) {}

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getUser(@Param('id') id: string) {
    return await this.getUserUseCase.execute(id);
  }
}
