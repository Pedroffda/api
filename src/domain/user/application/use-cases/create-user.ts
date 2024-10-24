import { User } from '../../enterprise/entities/user.entity';
import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user-repository';
import { HashGenerator } from '../../cryptography/hash-generator';

interface CreateCategoryRequest {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository, 
    private readonly hash: HashGenerator
  ) {}

  async execute({ name, email, password }: CreateCategoryRequest): Promise<User> {
    const existingUser = await this.userRepository.findByUserEmail(email);

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await this.hash.hash(password);

    const user = new User({ name, email, password:hashedPassword});

    return this.userRepository.create(user);
  }
}
