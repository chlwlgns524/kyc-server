const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
const process = require('process');
const path = require("path");

const {combine, timestamp, label, printf} = winston.format;

const logDir = `${process.cwd()}/logs`;

const logFormat = printf(({level, message, label, timestamp}) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
    format: combine(
        timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        label({label: 'kyc'}),
        logFormat,
    ),
    transports: [
        new winstonDaily({
            level: 'debug',
            datePattern: 'YYYY-MM-DD',
            dirname: path.join(logDir, '%DATE%'),
            filename: `%DATE%.log`,
            maxFiles: '365d',
            zippedArchive: true,
        }),
        new winston.transports.Console({
            level: 'debug',
            format: combine(
                timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                label({label: 'kyc-console'}),
                winston.format.colorize(),
                logFormat
            )
        })
    ],
    exceptionHandlers: [
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: path.join(logDir, '%DATE%'),
            filename: `%DATE%.exception.log`,
            maxFiles: '365d',
            zippedArchive: true,
        }),
    ],
});

module.exports = logger;