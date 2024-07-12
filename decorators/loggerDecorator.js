const { LOGGER_PATH } = require("../paths");
const logger = require(LOGGER_PATH);

function postLoggerDecorator(handler) {
    return function (req, res, next) {
        logger.info(`body -> ${JSON.stringify(req.body, null, 2)}`);
        handler(req, res, next);
    };
}

module.exports = postLoggerDecorator;