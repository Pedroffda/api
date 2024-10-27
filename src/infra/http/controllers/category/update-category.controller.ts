import { UpdateCategoryUseCase } from '@/domain/category/application/use-cases/update-category.use-case';
import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

const updateCategorySchema = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
  })
  .strict();

type UpdateCategoryDto = z.infer<typeof updateCategorySchema>;

@Controller('categories')
export class UpdateCategoryController {
  constructor(private readonly updateCategoryUseCase: UpdateCategoryUseCase) {}

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateCategory(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateCategorySchema))
    body: UpdateCategoryDto,
  ) {
    return await this.updateCategoryUseCase.execute(id, body);
  }
}
