const WebSocket = require("ws");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const { SYMBOLS } = require("./config.js");
const { setup } = require("./setup.js");

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
        console.log(response.data);
    });
}

async function main() {
    try {
        await setup();
        start();
    } catch (error) {
        console.log(error);
    }
}
