-- CreateTable
CREATE TABLE "Pearson" (
    "id" SERIAL NOT NULL,
    "symbol1" TEXT NOT NULL,
    "symbol2" TEXT NOT NULL,
    "pearson" DOUBLE PRECISION NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "timestampMax" BIGINT,
    "isMaximum" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Pearson_pkey" PRIMARY KEY ("id")
);
