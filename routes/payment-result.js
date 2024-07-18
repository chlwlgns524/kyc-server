const {LOGGER_PATH} = require('../paths');
const logger = require(LOGGER_PATH);

const express = require('express');
const router = express.Router();
const postLoggerDecorator = require("../decorators/loggerDecorator");
const {payScreeningFee} = require("../utils/api");

const SUCCESS_CODE = "0000";

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.post('/payment-result', postLoggerDecorator((req, res) => {
    const {order_id, rescode} = req.body;
    const loginId = order_id.slice(0, -10);
    logger.info(`${loginId} -> rescode from payment is ${rescode}`);
    if (rescode === SUCCESS_CODE) {
        payScreeningFee(loginId)
                .then(response => {
                    logger.info(`${loginId} is redirected to /payment-success`);
                    res.redirect('/payment-success');
                })
                .catch(error => {
                    logger.warn(`${loginId} is redirected to /payment-fail`);
                    res.redirect('/payment-fail');
                })
    } else {
        logger.warn("redirect to /payment-fail");
        res.redirect('/payment-fail');
    }
}));

module.exports = router;