import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryRepository } from '../repositories/category-repository';

@Injectable()
export class DeleteCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: string, userId: string): Promise<void> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (category.userId !== userId) {
      throw new ForbiddenException('You can only delete your own categories');
    }

    // Exclui a categoria se todas as verificações forem passadas
    await this.categoryRepository.delete(id);
  }
}
