const {LOGGER_PATH} = require("../paths");
const logger = require(LOGGER_PATH);
const sendSlackAlarm = require("../utils/slackAlarm");

function setupGlobalException() {
    process.on('uncaughtException', async (err) => {
        logger.error('There was an uncaught exception -> ', err);
        await sendSlackAlarm(`${process.env.ENVIRONMENT} 서버에 예외(uncaughtException)가 발생하였습니다.: ${err.message}`);
        process.exit(1);
    });
    process.on('unhandledRejection', async (reason, promise) => {
        logger.error('Unhandled Rejection at -> ', promise, ', reason -> ', reason);
        await sendSlackAlarm(`${process.env.ENVIRONMENT} 서버에 예외(unhandledRejection)가 발생하였습니다.: ${reason}`);
        process.exit(1);
    });
}

module.exports = setupGlobalException;