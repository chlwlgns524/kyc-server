const {LOGGER_PATH} = require("../paths");
const logger = require(LOGGER_PATH);

function beforeAfterLoggingMiddleWare(req, res, next) {
    logger.http(`${req.method} ${req.originalUrl} -> ${req.ip} requested.`);
    res.on('finish', () => {
        const statusCode = res.statusCode;
        if (statusCode >= 500) {
            logger.error(`${req.method} ${req.originalUrl} responded with status ${statusCode}.\n`);
        } else if (statusCode >= 400) {
            logger.warn(`${req.method} ${req.originalUrl} responded with status ${statusCode}.\n`);
        } else {
            logger.http(`${req.method} ${req.originalUrl} successfully responded with status ${statusCode}.\n`);
        }
    });
    next();
}

module.exports = beforeAfterLoggingMiddleWare;