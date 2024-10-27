import { GetCategoryUseCase } from '@/domain/category/application/use-cases/get-category.use-case';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('categories')
export class GetCategoryController {
  constructor(private readonly getCategoryUseCase: GetCategoryUseCase) {}

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getCategory(@Param('id') id: string) {
    return await this.getCategoryUseCase.execute(id);
  }
}
