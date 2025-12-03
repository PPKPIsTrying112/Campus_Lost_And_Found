const { chromium } = require("playwright");

module.exports = async () => {
    global.__BROWSER__ = await chromium.launch({ headless: true });
};
