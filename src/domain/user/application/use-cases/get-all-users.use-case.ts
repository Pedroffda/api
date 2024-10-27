import { Injectable } from '@nestjs/common';
import { User } from '../../enterprise/entities/user.entity';
import { UserRepository } from '../repositories/user-repository';

@Injectable()
export class GetAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users;
  }
}
