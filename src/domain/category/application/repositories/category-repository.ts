import { Category } from '../../enterprise/entities/category.entity';

export abstract class CategoryRepository {
  abstract create(category: Category): Promise<void>;
  abstract findById(id: string): Promise<Category | null>;
  abstract update(id: string, category: Category): Promise<Category>;
  abstract delete(id: string): Promise<void>;
  abstract findAll(): Promise<Category[]>;
  abstract findByName(name: string): Promise<Category | null>;
}
