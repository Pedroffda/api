import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repositories/category-repository';

@Injectable()
export class GetAllCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(userId: string) {
    const categories = await this.categoryRepository.findAllByUserId(userId);
    return categories;
  }
}
