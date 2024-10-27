import { UserPayload } from '@/infra/auth/jwt.strategy';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '../../enterprise/entities/user.entity';
import { UserRepository } from '../repositories/user-repository';

@Injectable()
export class GetAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(currentUser: UserPayload): Promise<User[]> {
    if (!currentUser.isAdmin) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }
    const users = await this.userRepository.findAll();
    return users;
  }
}
