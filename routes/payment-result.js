const { LOGGER_PATH } = require('../paths');
const logger = require(LOGGER_PATH);

const express = require('express');
const router = express.Router();
const postLoggerDecorator = require("../decorators/loggerDecorator");

const SUCCESS_CODE = "0000";

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/payment-result', postLoggerDecorator((req, res) => {
    const { rescode } = req.body;
    logger.info(`rescode from payment is ${rescode}`);
    if (rescode === SUCCESS_CODE) {
        logger.info("redirect to /payment-success");
        res.redirect('/payment-success');
    } else {
        logger.warn("redirect to /payment-fail");
        res.redirect('/payment-fail');
    }
}));

module.exports = router;