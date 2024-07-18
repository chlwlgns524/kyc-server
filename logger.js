const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
const process = require('process');
const path = require("path");
const moment = require('moment-timezone');

const { combine, label, printf } = winston.format;

const logDir = `${process.cwd()}/logs`;

const logFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const timestampFormat = winston.format((info) => {
    info.timestamp = moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');
    return info;
});

const logger = winston.createLogger({
    format: combine(
            timestampFormat(),
            label({ label: 'kyc' }),
            logFormat
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
                    timestampFormat(),
                    label({ label: 'kyc-console' }),
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