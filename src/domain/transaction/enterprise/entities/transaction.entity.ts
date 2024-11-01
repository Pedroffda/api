import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Decimal } from '@prisma/client/runtime/library';

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export interface ITransactionProps {
  type: TransactionType;
  amount: Decimal;
  description?: string;
  date: string;
  categoryId: string;
  accountId: string;
  createdAt?: Date;
  updatedAt?: Date | null;
}

export class Transaction extends Entity<ITransactionProps> {
  get type(): TransactionType {
    return this.props.type;
  }

  get amount(): Decimal {
    return this.props.amount;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  get date(): string {
    return this.props.date;
  }

  get categoryId(): string {
    return this.props.categoryId;
  }

  get createdAt(): Date {
    return this.props.createdAt ?? new Date();
  }

  get updatedAt(): Date | null {
    return this.props.updatedAt ?? null;
  }

  get accountId(): string {
    return this.props.accountId;
  }

  set accountId(value: string) {
    this.props.accountId = value;
  }

  set type(value: TransactionType) {
    this.props.type = value;
  }

  set amount(value: Decimal) {
    this.props.amount = value;
  }

  set description(value: string | undefined) {
    this.props.description = value;
  }

  set date(value: string) {
    this.props.date = value;
  }

  set categoryId(value: string) {
    this.props.categoryId = value;
  }

  static create(props: ITransactionProps, id?: UniqueEntityID) {
    const transaction = new Transaction(
      {
        ...props,
        createdAt: props.createdAt,
      },
      id,
    );

    return transaction;
  }

  toJSON() {
    return {
      id: this.id,
      type: this.type,
      amount: this.amount,
      description: this.description,
      date: this.date,
      categoryId: this.categoryId,
      accountId: this.accountId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
