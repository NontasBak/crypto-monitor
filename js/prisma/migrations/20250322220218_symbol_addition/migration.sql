/*
  Warnings:

  - Added the required column `symbol` to the `Measurement` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Symbol" AS ENUM ('BTC_USDT', 'ADA_USDT', 'ETH_USDT', 'DOGE_USDT', 'XRP_USDT', 'SOL_USDT', 'LTC_USDT', 'BNB_USDT');

-- AlterTable
ALTER TABLE "Measurement" ADD COLUMN     "symbol" "Symbol" NOT NULL;
