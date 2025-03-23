-- CreateTable
CREATE TABLE "Average" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "average" DOUBLE PRECISION NOT NULL,
    "timestamp" BIGINT NOT NULL,

    CONSTRAINT "Average_pkey" PRIMARY KEY ("id")
);
