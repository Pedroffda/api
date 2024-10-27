import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface IUserProps {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date | null;
  isAdmin?: boolean;
}

export class User extends Entity<IUserProps> {
  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get createdAt(): Date {
    return this.props.createdAt ?? new Date();
  }

  get updatedAt(): Date | null {
    return this.props.updatedAt ?? null;
  }

  get isAdmin(): boolean {
    return this.props.isAdmin ?? false;
  }

  set name(value: string) {
    this.props.name = value;
  }

  set email(value: string) {
    this.props.email = value;
  }

  set password(value: string) {
    this.props.password = value;
  }

  static create(props: IUserProps, id?: UniqueEntityID) {
    const user = new User(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return user;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
