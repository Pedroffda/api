import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryRepository } from '../repositories/category-repository';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(
    id: string,
    userId: string,
    updateData: { name?: string; description?: string },
  ) {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (category.userId !== userId) {
      throw new ForbiddenException(
        'You are not allowed to update this category',
      );
    }

    const updatedCategory = await this.categoryRepository.update(
      id,
      updateData,
    );

    return updatedCategory;
  }
}
