const {LOGGER_PATH} = require('../paths');
const logger = require(LOGGER_PATH);

const express = require('express');
const router = express.Router();
const postLoggerDecorator = require("../decorators/loggerDecorator");
const {payScreeningFee} = require("../utils/api");

router.use(express.json());
router.use(express.urlencoded({extended: true}));

const SUCCESS_CODE = "0000";

router.post('/payment-result', postLoggerDecorator((req, res) => {
    const {order_id, ref, rescode} = req.body;
    if (rescode === SUCCESS_CODE) {
        const loginId = order_id.slice(0, -10);
        payScreeningFee(loginId)
                .then(response => {
                    logger.info(`response -> ${JSON.stringify(response.data, null, 2)}`);
                    logger.info(`${loginId} is redirected to /payment-success`);
                    res.redirect('/payment-success');
                })
                .catch(error => {
                    logger.error(`${loginId} is redirected to /payment-fail because payScreeningFee API exception occured.`);
                    res.redirect('/payment-fail');
                })
    } else {
        const loginId = ref.slice(0, -10);
        logger.warn(`${loginId} is redirected to /payment-fail`);
        res.redirect('/payment-fail');
    }
}));

module.exports = router;