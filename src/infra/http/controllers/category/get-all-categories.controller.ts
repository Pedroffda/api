import { GetAllCategoriesUseCase } from '@/domain/category/application/use-cases/get-all-categories.use-case';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('categories')
export class GetAllCategoriesController {
  constructor(
    private readonly getAllCategoriesUseCase: GetAllCategoriesUseCase,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAllCategories(@CurrentUser() user: UserPayload) {
    return await this.getAllCategoriesUseCase.execute(user.sub);
  }
}
