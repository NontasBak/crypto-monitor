/*
  Warnings:

  - Added the required column `delay` to the `Average` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delay` to the `Pearson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Average" ADD COLUMN     "delay" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Pearson" ADD COLUMN     "delay" INTEGER NOT NULL;
