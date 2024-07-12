const { LOGGER_PATH } = require('../paths');
const logger = require(LOGGER_PATH);
const express = require('express');
const router = express.Router();
const generateFGKey = require("../utils/generateFGKey");
const postLoggerDecorator = require("../decorators/loggerDecorator");

router.use(express.json());

router.post('/fgkey', postLoggerDecorator( async (req, res) => {
    const { loginId, operatorEmail } = req.body;
    try {
        const fgKeyResponse = await generateFGKey(loginId, operatorEmail);
        logger.info(`fgkey response -> ${JSON.stringify(fgKeyResponse, null, 2)}`);
        res.json(fgKeyResponse);
    } catch (error) {
        logger.error('Generating fgkey failed.');
        res
                .status(500)
                .json({ error: 'Failed to generate FGKey' });
    }
}));

module.exports = router;