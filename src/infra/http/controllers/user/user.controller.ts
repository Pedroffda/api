import { CreateUserUseCase } from '@/domain/user/application/use-cases/create-user';
import { GetAllUserUseCase } from '@/domain/user/application/use-cases/get-all-user';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getAllUserUseCase: GetAllUserUseCase,
  ) {}

  @Post()
  async create(
    @Body() body: { name: string; email: string; password: string },
  ) {
    const { name, email, password } = body;
    const category = await this.createUserUseCase.execute({
      name,
      email,
      password,
    });
    return category;
  }

  @Get()
  async findAll() {
    const users = await this.getAllUserUseCase.execute();
    return users;
  }
}
