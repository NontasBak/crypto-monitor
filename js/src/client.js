import { PrismaClient } from "@prisma/client";

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

module.exports = { addMeasurement };
