import { CreateUserUseCase } from '@/domain/user/application/use-cases/create-user.use-case';
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

const createUserBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type CreateUserBody = z.infer<typeof createUserBodySchema>;

@Controller('users')
export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserBodySchema))
  async create(@Body() body: CreateUserBody) {
    const { name, email, password } = body;
    const category = await this.createUserUseCase.execute({
      name,
      email,
      password,
    });
    return category;
  }
}
