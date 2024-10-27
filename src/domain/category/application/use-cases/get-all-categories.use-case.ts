import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from '../repositories/category-repository';

@Injectable()
export class GetAllCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute() {
    const categories = await this.categoryRepository.findAll();
    if (!categories) {
      throw new NotFoundException('Categories not found');
    }
    return categories;
  }
}
