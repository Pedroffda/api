import { CategoryRepository } from '@/domain/category/application/repositories/category-repository';
import { CreateCategoryUseCase } from '@/domain/category/application/use-cases/create-category';
import { FindCategoriesUseCase } from '@/domain/category/application/use-cases/find-categories';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { PrismaCategoryRepository } from '@/infra/database/prisma/repositories/prisma-category-repository';
import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';

@Module({
  controllers: [CategoryController],
  providers: [
    PrismaService,
    CreateCategoryUseCase,
    FindCategoriesUseCase,
    {
      provide: CategoryRepository, // Registrando a interface com sua implementação concreta
      useClass: PrismaCategoryRepository,
    },
  ],
})
export class CategoryModule {}
