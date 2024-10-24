export class Category {
  public readonly id: string;
  public readonly name: string;
  public readonly userId: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date | null;

  constructor(
    props: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date | null,
  ) {
    this.id = id ?? '';
    this.name = props.name;
    this.userId = props.userId;
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? null;
  }
}
