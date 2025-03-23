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
    await prisma.$transaction([deleteMeasurements]);
}

module.exports = { addMeasurement, deleteDbRecords };
