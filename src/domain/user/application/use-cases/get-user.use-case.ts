import { UserPayload } from '@/infra/auth/jwt.strategy';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../../enterprise/entities/user.entity';
import { UserRepository } from '../repositories/user-repository';

@Injectable()
export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    userId: string,
    userPayload: UserPayload,
  ): Promise<User | null> {
    if (!userPayload.isAdmin && userPayload.sub !== userId) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }
    const user = await this.userRepository.findByUserId(userId);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
