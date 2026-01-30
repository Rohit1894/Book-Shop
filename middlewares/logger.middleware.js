const fs = require('fs');

module.exports = (req, res, next) => {
    const log = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
    try {
        fs.appendFileSync("logs.txt", log);
    } catch (err) {
        // If writing to file fails (e.g., 'logs.txt' is a directory), fall back to console
        console.log(log.trim());
    }

    next();
};
