/*
  Warnings:

  - Made the column `maxTimestamp` on table `Pearson` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Pearson" ALTER COLUMN "maxTimestamp" SET NOT NULL;
