/*
  Warnings:

  - Changed the type of `type` on the `transactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('INCOME', 'EXPENSE', 'TRANSFER', 'INVESTMENT', 'WITHDRAWAL', 'DEPOSIT', 'PAYMENT', 'REIMBURSEMENT', 'REFUND', 'CHARGE', 'DONATION', 'ADJUSTMENT');

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "type",
ADD COLUMN     "type" "TransactionType" NOT NULL;
