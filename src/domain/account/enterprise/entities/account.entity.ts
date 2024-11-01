import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Transaction } from '@/domain/transaction/enterprise/entities/transaction.entity';

export interface IAccountProps {
  name: string;
  description?: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
  isActive?: boolean;
  transactions?: Transaction[];
}

export class Account extends Entity<IAccountProps> {
  // Getters
  get name(): string {
    return this.props.name;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  get userId(): string {
    return this.props.userId;
  }

  get createdAt(): Date {
    return this.props.createdAt ?? new Date();
  }

  get updatedAt(): Date | null {
    return this.props.updatedAt ?? null;
  }

  get deletedAt(): Date | null {
    return this.props.deletedAt ?? null;
  }

  get isActive(): boolean {
    return this.props.isActive ?? true;
  }

  get transactions(): Transaction[] | undefined {
    return this.props.transactions;
  }

  // Setters
  set name(value: string) {
    this.props.name = value;
  }

  set description(value: string | undefined) {
    this.props.description = value;
  }

  set isActive(value: boolean) {
    this.props.isActive = value;
  }

  // Método de criação da entidade com valores padrão
  static create(props: IAccountProps, id?: UniqueEntityID) {
    const account = new Account(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        isActive: props.isActive ?? true,
      },
      id,
    );

    return account;
  }

  // Serialização da entidade para JSON
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      isActive: this.isActive,
      transactions: this.transactions,
    };
  }
}
