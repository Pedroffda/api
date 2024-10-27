import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Decimal } from '@prisma/client/runtime/library';

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
  TRANSFER = 'TRANSFER',
  INVESTMENT = 'INVESTMENT',
  WITHDRAWAL = 'WITHDRAWAL',
  DEPOSIT = 'DEPOSIT',
  PAYMENT = 'PAYMENT',
  REIMBURSEMENT = 'REIMBURSEMENT',
  REFUND = 'REFUND',
  CHARGE = 'CHARGE',
  DONATION = 'DONATION',
  ADJUSTMENT = 'ADJUSTMENT',
}

export interface ITransactionProps {
  type: TransactionType;
  amount: Decimal;
  description?: string;
  date: string;
  userId: string;
  categoryId: string;
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

  get userId(): string {
    return this.props.userId;
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

  set userId(value: string) {
    this.props.userId = value;
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
      userId: this.userId,
      categoryId: this.categoryId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
