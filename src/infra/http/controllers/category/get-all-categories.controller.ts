import { GetAllCategoriesUseCase } from '@/domain/category/application/use-cases/get-all-categories.use-case';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('categories')
export class GetAllCategoriesController {
  constructor(
    private readonly getAllCategoriesUseCase: GetAllCategoriesUseCase,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAllCategories() {
    return await this.getAllCategoriesUseCase.execute();
  }
}
