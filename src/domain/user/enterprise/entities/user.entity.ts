export class User {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public readonly password: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date | null;

  constructor(
    props: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date | null,
  ) {
    this.id = id ?? '';
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? null;
  }
}
