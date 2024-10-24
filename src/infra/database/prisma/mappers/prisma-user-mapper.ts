// import { User as UserEntity } from '@/domain/user/enterprise/entities/user.entity';
// import { User as PrismaUser } from '@prisma/client';

// export class PrismaUserMapper {
//   static toDomain(user: PrismaUser): UserEntity {
//     return new UserEntity(
//       {
//         name: user.name ?? '',
//         email: user.email,
//       },
//       user.id,
//       user.createdAt,
//       user.updatedAt,
//     );
//   }
// }
