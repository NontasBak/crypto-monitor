const { getMeasurements, addAverage } = require("./client");

const MOVING_AVG_WINDOW = 15; // In minutes

async function calculateAverage(symbol, currentTimestamp) {
    const measurements = getMeasurements(
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
    await addAverage(symbol, average, currentTimestamp);
}

module.exports = { calculateAverage };
