import { UserRepository } from '@/domain/user/application/repositories/user-repository';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Category,
  ICategoryProps,
} from '../../enterprise/entities/category.entity';
import { CategoryRepository } from '../repositories/category-repository';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(data: ICategoryProps): Promise<Category> {
    const category = Category.create({
      name: data.name,
      description: data.description,
      userId: data.userId,
    });

    const userIdExists = await this.userRepository.findByUserId(
      category.userId,
    );

    if (!userIdExists) {
      throw new NotFoundException('User not found');
    }

    const categoryExists = await this.categoryRepository.findByName(
      category.name,
    );

    if (categoryExists) {
      throw new ConflictException('Category already exists');
    }

    await this.categoryRepository.create(category);
    return category;
  }
}
