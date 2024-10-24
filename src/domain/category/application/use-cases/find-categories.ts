import { Category } from '@/domain/category/enterprise/entities/category.entity';
import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repositories/category-repository';

@Injectable()
export class FindCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(userId: string): Promise<Category[]> {
    return this.categoryRepository.findByUserId(userId);
  }
}
