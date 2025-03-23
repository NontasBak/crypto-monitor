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

const MOVING_AVG_WINDOW = 15; // In minutes

const PEARSON_WINDOW = 8;

module.exports = { SYMBOLS, MOVING_AVG_WINDOW, PEARSON_WINDOW };
