import { DeleteCategoryUseCase } from '@/domain/category/application/use-cases/delete-category.use-case';
import { Controller, Delete, Headers, Param, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Controller('categories')
export class DeleteCategoryController {
  constructor(
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
    private readonly jwtService: JwtService,
  ) {}

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteCategory(
    @Param('id') id: string,
    @Headers('authorization') token: string,
  ) {
    const authenticatedUserId = this.jwtService.verify(
      token.replace('Bearer ', ''),
    ).sub;

    return await this.deleteCategoryUseCase.execute(id, authenticatedUserId);
  }
}
