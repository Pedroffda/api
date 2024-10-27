import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from '../repositories/category-repository';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: string, data: { name?: string; description?: string }) {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (data.name) category.name = data.name;
    if (data.description) category.description = data.description;

    return await this.categoryRepository.update(id, category);
  }
}
