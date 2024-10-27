import { GetCategoryUseCase } from '@/domain/category/application/use-cases/get-category.use-case';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('categories')
export class GetCategoryController {
  constructor(private readonly getCategoryUseCase: GetCategoryUseCase) {}

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getCategory(@Param('id') id: string, @CurrentUser() user: UserPayload) {
    return await this.getCategoryUseCase.execute(id, user.sub);
  }
}
