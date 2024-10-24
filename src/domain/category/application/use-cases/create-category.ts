import { Category } from '@/domain/category/enterprise/entities/category.entity';
import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repositories/category-repository';

interface CreateCategoryRequest {
  name: string;
  userId: string;
}

@Injectable()
export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute({ name, userId }: CreateCategoryRequest): Promise<Category> {
    const category = new Category({ name, userId });
    return this.categoryRepository.create(category);
  }
}
