import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user-repository';
import { User } from '../../enterprise/entities/user.entity';

@Injectable()
export class FindUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string): Promise<User> {
    const user = await this.userRepository.findByUserId(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
