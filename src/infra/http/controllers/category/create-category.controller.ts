import { CreateCategoryUseCase } from '@/domain/category/application/use-cases/create-category.use-case';
import {
  Body,
  Controller,
  Headers,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

const createCategorySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export type CreateCategoryDto = z.infer<typeof createCategorySchema>;

@Controller('categories')
export class CreateCategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ZodValidationPipe(createCategorySchema))
  async create(
    @Body() body: CreateCategoryDto,
    @Headers('authorization') token: string,
  ) {
    const { name, description } = body;
    const itsValidToken = this.jwtService.verify(token.replace('Bearer ', ''));
    const userId = itsValidToken.sub;
    const category = await this.createCategoryUseCase.execute({
      name,
      description,
      userId,
    });
    return category;
  }
}
