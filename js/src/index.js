const WebSocket = require("ws");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const SYMBOLS = [
    "BTC-USDT",
    "ADA-USDT",
    "ETH-USDT",
    "DOGE-USDT",
    "XRP-USDT",
    "SOL-USDT",
    "LTC-USDT",
    "BNB-USDT",
];

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

start().catch((error) => {
    console.error(error);
});
