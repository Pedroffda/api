import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../enterprise/entities/user.entity';
import { UserRepository } from '../repositories/user-repository';

@Injectable()
export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string): Promise<User | null> {
    const user = await this.userRepository.findByUserId(userId);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
