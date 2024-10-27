import { DeleteCategoryUseCase } from '@/domain/category/application/use-cases/delete-category.use-case';
import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('categories')
export class DeleteCategoryController {
  constructor(private readonly deleteCategoryUseCase: DeleteCategoryUseCase) {}

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteCategory(@Param('id') id: string) {
    return await this.deleteCategoryUseCase.execute(id);
  }
}
