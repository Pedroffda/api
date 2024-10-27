import { UniqueEntityID } from './unique-entity-id';

export abstract class Entity<Props> {
  private readonly _id: UniqueEntityID;
  protected props: Props;

  get id(): string {
    return this._id.toValue();
  }

  protected constructor(props: Props, id?: UniqueEntityID) {
    this.props = props;
    this._id = id ?? new UniqueEntityID();
  }

  public equals(entity: Entity<any>) {
    if (entity === this) {
      return true;
    }

    if (entity.id === this.id) {
      return true;
    }

    return false;
  }
}
