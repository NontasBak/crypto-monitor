const { PrismaClient } = require("@prisma/client");
const { differenceInMilliseconds } = require("date-fns");

const prisma = new PrismaClient();

async function addMeasurement(data) {
    try {
        await prisma.measurement.create({
            data: {
                symbol: data.instId,
                price: data.px,
                size: data.sz,
                timestamp: data.ts,
            },
        });
    } catch (error) {
        console.log(error);
    }
}

async function deleteDbRecords() {
    const deleteMeasurements = prisma.measurement.deleteMany();
    const deleteAverages = prisma.average.deleteMany();
    const deletePearsons = prisma.pearson.deleteMany();

    await prisma.$transaction([
        deleteMeasurements,
        deleteAverages,
        deletePearsons,
    ]);
}

async function getMeasurements(symbol, window, currentTimestamp) {
    const windowInMs = window * 60 * 1000;
    const startTime = currentTimestamp - windowInMs;
    try {
        const measurements = await prisma.measurement.findMany({
            where: {
                symbol: symbol,
                timestamp: {
                    gte: startTime,
                    lt: currentTimestamp,
                },
            },
        });
        return measurements;
    } catch (error) {
        console.log(error);
    }
}

async function addAverage(symbol, average, currentTimestamp) {
    try {
        const calculationDelay = differenceInMilliseconds(
            new Date(),
            currentTimestamp,
        );

        await prisma.average.create({
            data: {
                symbol: symbol,
                average: average,
                timestamp: currentTimestamp,
                delay: calculationDelay,
            },
        });
    } catch (error) {
        console.log(error);
    }
}

// This function returns either all averages from a symbol,
// or a window of averages (e.g. 8)
async function getAverages(symbol, currentTimestamp, window = null) {
    try {
        // If window is not provided, return all averages
        if (!window) {
            const averages = await prisma.average.findMany({
                where: {
                    symbol: symbol,
                    timestamp: {
                        lt: currentTimestamp,
                    },
                },
                select: {
                    average: true,
                },
            });
            return averages.map((item) => item.average);
        } else {
            const averages = await prisma.average.findMany({
                where: {
                    symbol: symbol,
                    timestamp: {
                        lt: currentTimestamp,
                    },
                },
                orderBy: {
                    id: "desc",
                },
                select: {
                    average: true,
                },
                take: window,
            });
            return averages.map((item) => item.average);
        }
    } catch (error) {
        console.log(error);
    }
}

async function addPearsonCorrelation(
    symbol1,
    symbol2,
    maxPearson,
    currentTimestamp,
    maxTimestamp,
) {
    try {
        const calculationDelay = differenceInMilliseconds(
            new Date(),
            currentTimestamp,
        );

        await prisma.pearson.create({
            data: {
                symbol1: symbol1,
                symbol2: symbol2,
                maxPearson: maxPearson,
                timestamp: currentTimestamp,
                maxTimestamp: maxTimestamp,
                delay: calculationDelay,
            },
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    addMeasurement,
    deleteDbRecords,
    getMeasurements,
    addAverage,
    getAverages,
    addPearsonCorrelation,
};
