import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user-repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    private readonly userRepository: UserRepository, 
  ) {}

  async execute(userId: string): Promise<void> {
     const user = await this.userRepository.findByUserId(userId);
    if (!user) {
      throw new Error('User not found');
    } 
    await this.userRepository.delete(userId);

  }
}