import { CreateCategoryUseCase } from '@/domain/category/application/use-cases/create-category';
import { FindCategoriesUseCase } from '@/domain/category/application/use-cases/find-categories';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly findCategoriesUseCase: FindCategoriesUseCase,
  ) {}

  @Post()
  async create(@Body() body: { name: string; userId: string }) {
    const { name, userId } = body;
    const category = await this.createCategoryUseCase.execute({ name, userId });
    return category;
  }

  @Get()
  async find(@Query('userId') userId: string) {
    const categories = await this.findCategoriesUseCase.execute(userId);
    return categories;
  }
}
