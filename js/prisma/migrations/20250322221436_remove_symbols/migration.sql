/*
  Warnings:

  - Changed the type of `symbol` on the `Measurement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Measurement" DROP COLUMN "symbol",
ADD COLUMN     "symbol" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Symbol";
