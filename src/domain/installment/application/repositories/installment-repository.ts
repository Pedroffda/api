import { Installment } from '../../enterprise/entities/installment.entity';

export abstract class InstallmentRepository {
  abstract create(category: Installment): Promise<void>;
  abstract findById(id: string): Promise<Installment | null>;
  abstract update(
    id: string,
    updateData: Partial<Installment>,
  ): Promise<Installment>;
  abstract delete(id: string): Promise<void>;
  abstract findAll(userId: string): Promise<Installment[]>;
}
