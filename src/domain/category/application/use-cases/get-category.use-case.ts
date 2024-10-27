import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryRepository } from '../repositories/category-repository';

@Injectable()
export class GetCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: string, userId: string) {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    if (category.userId !== userId) {
      throw new ForbiddenException(
        'You are not allowed to access this category',
      );
    }

    return category;
  }
}
