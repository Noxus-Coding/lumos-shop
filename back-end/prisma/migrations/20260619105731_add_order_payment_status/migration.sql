-- CreateEnum
CREATE TYPE "PagamentStatus" AS ENUM ('PENDENTE', 'PAGO');

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "paymentStatus" "PagamentStatus" NOT NULL DEFAULT 'PENDENTE';
