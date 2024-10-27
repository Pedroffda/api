import { UserPayload } from '@/infra/auth/jwt.strategy';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user-repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string, userPayload: UserPayload): Promise<void> {
    if (userPayload.sub !== userId && !userPayload.isAdmin) {
      throw new ForbiddenException('You can only delete your own account');
    }

    const user = await this.userRepository.findByUserId(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.delete(userId);
  }
}
