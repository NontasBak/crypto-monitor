/*
  Warnings:

  - You are about to drop the column `isMaximum` on the `Pearson` table. All the data in the column will be lost.
  - You are about to drop the column `pearson` on the `Pearson` table. All the data in the column will be lost.
  - You are about to drop the column `timestampMax` on the `Pearson` table. All the data in the column will be lost.
  - Added the required column `maxPearson` to the `Pearson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pearson" DROP COLUMN "isMaximum",
DROP COLUMN "pearson",
DROP COLUMN "timestampMax",
ADD COLUMN     "maxPearson" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "maxTimestamp" BIGINT;
