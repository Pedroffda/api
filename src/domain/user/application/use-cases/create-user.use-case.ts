import { ConflictException, Injectable } from '@nestjs/common';
import { HashGenerator } from '../../cryptography/hash-generator';
import { User } from '../../enterprise/entities/user.entity';
import { UserRepository } from '../repositories/user-repository';

interface CreateCategoryRequest {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hash: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: CreateCategoryRequest): Promise<void> {
    const existingUser = await this.userRepository.findByUserEmail(email);

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await this.hash.hash(password);

    const user = User.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.userRepository.create(user);
  }
}
