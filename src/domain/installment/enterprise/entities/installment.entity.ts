// domain/installment/entity/installment.ts
import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Decimal } from '@prisma/client/runtime/library';

export interface IInstallmentProps {
  amount: Decimal;
  dueDate: Date;
  status: string;
  transactionId: string;
  createdAt?: Date;
  updatedAt?: Date | null;
}

export class Installment extends Entity<IInstallmentProps> {
  private constructor(props: IInstallmentProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get amount(): Decimal {
    return this.props.amount;
  }

  get dueDate(): Date {
    return this.props.dueDate;
  }

  get status(): string {
    return this.props.status;
  }

  get transactionId(): string {
    return this.props.transactionId;
  }

  get createdAt(): Date {
    return this.props.createdAt ?? new Date();
  }

  get updatedAt(): Date | null {
    return this.props.updatedAt ?? null;
  }

  public static create(
    props: IInstallmentProps,
    id?: UniqueEntityID,
  ): Installment {
    const installment = new Installment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? null,
      },
      id,
    );

    return installment;
  }

  toJSON() {
    return {
      id: this.id.toString(),
      amount: this.amount,
      dueDate: this.dueDate.toISOString(),
      status: this.status,
      transactionId: this.transactionId,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt ? this.updatedAt.toISOString() : null,
    };
  }
}
