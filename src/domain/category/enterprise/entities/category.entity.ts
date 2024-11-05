import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface ICategoryProps {
  id?: string;
  name: string;
  description?: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date | null;
}

export class Category extends Entity<ICategoryProps> {
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

  set name(value: string) {
    this.props.name = value;
  }

  set description(value: string | undefined) {
    this.props.description = value;
  }

  set userId(value: string) {
    this.props.userId = value;
  }

  static create(props: ICategoryProps, id?: UniqueEntityID) {
    const category = new Category(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return category;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      userId: this.props.userId,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
