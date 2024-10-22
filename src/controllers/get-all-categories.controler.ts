import { Controller, Get, Query, UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/current-user-decorator';
import { UserPayload } from 'src/auth/jwt.strategy';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { PrismaService } from 'src/prisma/prisma.service';
import { z } from 'zod';

const pageQueryParamsSchema = z.object({
  page: z.string().optional(),
  perPage: z.string().optional(),
});

@Controller('/categories')
@UseGuards(AuthGuard('jwt'))
export class GetAllCategoriesController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @UsePipes(new ZodValidationPipe(pageQueryParamsSchema))
  async getAllCategories(
    @CurrentUser() user: UserPayload,
    @Query() query: z.infer<typeof pageQueryParamsSchema>,
  ) {
    const userId = user.sub;

    // Extrair parâmetros de paginação da query
    const page = query.page ? parseInt(query.page, 10) : 1;
    const perPage = query.perPage ? parseInt(query.perPage, 10) : 10;

    // Buscar categorias paginadas para o usuário
    const categories = await this.prisma.category.findMany({
      where: {
        userId,
      },
      skip: (page - 1) * perPage,
      take: perPage,
    });

    return categories;
  }
}
