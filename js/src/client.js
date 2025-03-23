const { PrismaClient } = require("@prisma/client");

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

    await prisma.$transaction([deleteMeasurements, deleteAverages]);
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
        await prisma.average.create({
            data: {
                symbol: symbol,
                average: average,
                timestamp: currentTimestamp,
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
};
