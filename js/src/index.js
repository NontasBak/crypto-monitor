const WebSocket = require("ws");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const { SYMBOLS } = require("./config.js");
const { setup } = require("./setup.js");
const { addMeasurement, deleteDbRecords } = require("./client.js");
const {
    differenceInMilliseconds,
    addMinutes,
    startOfMinute,
    getTime,
} = require("date-fns");
const { calculateAllAverages } = require("./moving-average.js");
const { calculateAllCorrelations } = require("./pearson-corr.js");

async function start() {
    const ws = new WebSocket(`wss://ws.okx.com:8443/ws/v5/public`);

    ws.on("open", () => {
        console.log("Websocket connection established");

        const subscriptions = SYMBOLS.map((symbol) => ({
            channel: "trades",
            instId: symbol,
        }));

        ws.send(
            JSON.stringify({
                op: "subscribe",
                args: subscriptions,
            }),
        );
    });

    ws.on("message", (message) => {
        const response = JSON.parse(message);
        let measurement = response.data;
        if (measurement) {
            measurement = measurement[0];
            measurement = {
                ...measurement,
                px: parseFloat(measurement.px),
                sz: parseFloat(measurement.sz),
                ts: parseInt(measurement.ts),
            };
            // console.log(measurement);
            addMeasurement(measurement);
        }
    });

    runEveryMinute();
}

async function runEveryMinute() {
    const now = new Date();
    const nextMinute = addMinutes(startOfMinute(now), 1);
    const delay = differenceInMilliseconds(nextMinute, now);

    console.log(`Waiting ${delay} ms...`);

    setTimeout(async () => {
        console.log("Minute reached!");
        const currentTimestamp = getTime(startOfMinute(new Date()));

        // Run next loop instantly
        runEveryMinute();

        const promiseAverages = calculateAllAverages(currentTimestamp);
        const promiseCorrelations = calculateAllCorrelations(currentTimestamp);

        await Promise.all([promiseAverages, promiseCorrelations]);

        const calculationDelay = differenceInMilliseconds(
            new Date(),
            currentTimestamp,
        );
        console.log(`Calculation delay: ${calculationDelay}`);
    }, delay);
}

async function main() {
    try {
        await setup();
        start();
    } catch (error) {
        console.log(error);
    }
}

// deleteDbRecords();
main();
