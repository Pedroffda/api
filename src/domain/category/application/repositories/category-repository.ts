import { Category } from '../../enterprise/entities/category.entity';

export abstract class CategoryRepository {
  abstract create(data: Category): Promise<Category>;
  abstract findByUserId(userId: string): Promise<Category[]>;
}
