const fs = require("node:fs");
const { SYMBOLS } = require("./config.js");

const folderPath = "../data";
const subFolderNames = ["moving_averages", "correlations", "transactions"];

async function setup() {
    try {
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync("../data");
        }

        subFolderNames.forEach((subFolder) => {
            const subFolderPath = `${folderPath}/${subFolder}`;
            if (!fs.existsSync(subFolderPath)) {
                fs.mkdirSync(subFolderPath);
            }
        });
    } catch (error) {
        throw error;
    }
}

module.exports = { setup };
