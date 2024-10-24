// import { PrismaService } from '@/infra/database/prisma/prisma.service';
// import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
// import {
//   Body,
//   ConflictException,
//   Controller,
//   Post,
//   UsePipes,
// } from '@nestjs/common';
// import { hash } from 'bcryptjs';
// import { z } from 'zod';
// const createAccountBodySchema = z.object({
//   name: z.string(),
//   email: z.string().email(),
//   password: z.string().min(6),
// });

// type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

// @Controller('/accounts')
// export class CreateAccountController {
//   constructor(private readonly prisma: PrismaService) {}

//   @Post()
//   @UsePipes(new ZodValidationPipe(createAccountBodySchema))
//   async createAccount(@Body() body: CreateAccountBodySchema) {
//     const { name, email, password } = createAccountBodySchema.parse(body);

//     const userWithSameEmail = await this.prisma.user.findUnique({
//       where: {
//         email,
//       },
//     });

//     if (userWithSameEmail) {
//       throw new ConflictException('User with same email already exists');
//     }

//     const hashedPassword = await hash(password, 8);

//     await this.prisma.user.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword,
//       },
//     });
//   }
// }
