import { CreateCategoryUseCase } from '@/domain/category/application/use-cases/create-category.use-case';
import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

const createCategorySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  userId: z.string(),
});

type CreateCategoryDto = z.infer<typeof createCategorySchema>;

@Controller('categories')
export class CreateCategoryController {
  constructor(private readonly createCategoryUseCase: CreateCategoryUseCase) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ZodValidationPipe(createCategorySchema))
  async create(@Body() body: CreateCategoryDto) {
    const { name, description, userId } = body;
    const category = await this.createCategoryUseCase.execute({
      name,
      description,
      userId,
    });
    return category;
  }
}
