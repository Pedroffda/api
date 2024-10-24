import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user-repository';
import { User } from '../../enterprise/entities/user.entity';

@Injectable()
export class GetAllUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    // return await this.userRepository.findAll();
    const users = await this.userRepository.findAll();
  }
}
