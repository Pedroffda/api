// import { Body, Controller, Post, UseGuards } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { AuthGuard } from '@nestjs/passport';
// import { CurrentUser } from 'src/auth/current-user-decorator';
// import { UserPayload } from 'src/auth/jwt.strategy';
// import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { z } from 'zod';

// // model Transaction {
// //     id        String      @id @default(uuid())
// //     type       String
// //     amount    Decimal
// //     description String?
// //     date       DateTime
// //     userId     String @map("user_id")
// //     user       User @relation(fields: [userId], references: [id])
// //     catecoryId String @map("category_id")
// //     category   Category @relation(fields: [catecoryId], references: [id])
// //     installments Installment[]
// //     createdAt DateTime? @default(now()) @map("created_at")
// //     updatedAt DateTime? @updatedAt @map("updated_at")

// //     @@map("transactions")
// //   }
// const createTransactionBodySchema = z.object({
//   type: z.string(),
//   amount: z.number(),
//   description: z.string().optional(),
//   date: z.string(),
//   categoryId: z.string(),
// });

// @Controller('/transactions')
// @UseGuards(AuthGuard('jwt'))
// export class CreateTransactionsController {
//   constructor(
//     private readonly prisma: PrismaService,
//     private readonly jwtService: JwtService,
//   ) {}
//   @Post()
//   async handle(
//     @Body(new ZodValidationPipe(createTransactionBodySchema))
//     body: z.infer<typeof createTransactionBodySchema>,
//     @CurrentUser() user: UserPayload,
//   ) {
//     const { type, amount, description, date, categoryId } = body;

//     const transaction = await this.prisma.transaction.create({
//       data: {
//         type,
//         amount,
//         description,
//         date: new Date(date),
//         userId: user.sub,
//         category: categoryId,
//       },
//     });

//     return transaction;
//   }
// }
