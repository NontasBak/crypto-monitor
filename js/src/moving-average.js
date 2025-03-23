const { getMeasurements, addAverage } = require("./client");
const { SYMBOLS, MOVING_AVG_WINDOW } = require("./config");

async function calculateAverage(symbol, currentTimestamp) {
    const measurements = await getMeasurements(
        symbol,
        MOVING_AVG_WINDOW,
        currentTimestamp,
    );

    const weightedAveragePrice = measurements.reduce((total, measurement) => {
        return total + measurement.price * measurement.size;
    }, 0);

    const totalVolume = measurements.reduce((total, measurement) => {
        return total + measurement.size;
    }, 0);

    const average = weightedAveragePrice / totalVolume;

    if (!average) {
        return;
    }
    await addAverage(symbol, average, currentTimestamp);
}

async function calculateAllAverages(currentTimestamp) {
    const promises = [];
    SYMBOLS.forEach((symbol) => {
        promises.push(calculateAverage(symbol, currentTimestamp));
    });

    await Promise.all(promises);

    // For testing:
    // await new Promise((resolve) => {
    //     setTimeout(() => {
    //         console.log("womp");
    //         resolve();
    //     }, 3000);
    // });
}

module.exports = { calculateAllAverages };
