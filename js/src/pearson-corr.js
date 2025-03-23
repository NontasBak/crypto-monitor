const { SYMBOLS, PEARSON_WINDOW } = require("./config");
const { getAverages, addPearsonCorrelation } = require("./client");

// Check https://en.wikipedia.org/wiki/Pearson_correlation_coefficient
// for details
async function calculatePearsonCorrelation(x, y) {
    if (x.length !== y.length) {
        throw new Error("Arrays must have the same length");
    }

    const n = x.length;
    if (n === 0) {
        return 0;
    }

    // Means of x & y
    const xMean = x.reduce((sum, val) => sum + val, 0) / n;
    const yMean = y.reduce((sum, val) => sum + val, 0) / n;

    let numerator = 0;
    let xDenominator = 0;
    let yDenominator = 0;

    for (let i = 0; i < n; i++) {
        const xDiff = x[i] - xMean;
        const yDiff = y[i] - yMean;
        numerator += xDiff * yDiff;
        xDenominator += xDiff * xDiff;
        yDenominator += yDiff * yDiff;
    }

    if (xDenominator === 0 || yDenominator === 0) {
        return 0;
    }

    const correlation = numerator / Math.sqrt(xDenominator * yDenominator);
    // console.log(correlation);
    return correlation;
}

function findMaximumIndex(arr) {
    let max = arr[0];
    let maxIndex = 0;

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

async function calculateAllCorrelations(currentTimestamp) {
    return new Promise(async (resolve) => {
        const allPromises = SYMBOLS.map(async (symbol1) => {
            const averages1 = await getAverages(
                symbol1,
                currentTimestamp,
                PEARSON_WINDOW,
            );

            if (averages1.length < 8) {
                return;
            }

            const pearsonValues = [];
            const slidingTimestamps = [];
            const symbol2arr = [];

            const innerPromises = SYMBOLS.map(async (symbol2) => {
                const averages2 = await getAverages(symbol2, currentTimestamp);

                // Total number of averages (might be a lot larger than 8)
                const n = averages2.length;

                let numOfSlides;
                if (symbol1 !== symbol2) {
                    numOfSlides = n - PEARSON_WINDOW + 1;
                } else {
                    numOfSlides = n - PEARSON_WINDOW - 1;
                }

                if (numOfSlides <= 0) return;

                for (let i = 0; i < numOfSlides; i++) {
                    const averagesSlice2 = averages2.slice(
                        i,
                        i + PEARSON_WINDOW,
                    );

                    const pearsonValue = await calculatePearsonCorrelation(
                        averages1,
                        averagesSlice2,
                    );
                    pearsonValues.push(pearsonValue);

                    // Starting timestamp of window
                    const slideTimestamp =
                        currentTimestamp - averages2.length * 60000 + i * 60000;

                    slidingTimestamps.push(slideTimestamp);
                    symbol2arr.push(symbol2);
                }
            });
            await Promise.all(innerPromises);

            const maximumIndex = findMaximumIndex(pearsonValues);
            return addPearsonCorrelation(
                symbol1,
                symbol2arr[maximumIndex],
                pearsonValues[maximumIndex],
                currentTimestamp,
                slidingTimestamps[maximumIndex],
            );
        });

        await Promise.all(allPromises);
        resolve();
    });
}

module.exports = { calculateAllCorrelations };
