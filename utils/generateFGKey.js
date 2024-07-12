const { LOGGER_PATH } = require('../paths');
const logger = require(LOGGER_PATH);

const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config({path: './environments/exec.env'});

const {
    AUTHORIZATION_HEADER,
    FG_KEY_ENDPOINT,
    SCREENING_MID,
    TEST,
    PROD,
    FRONT_END_SERVER_API_ADDRESS
} = require("./api-const");

async function generateFGKey(loginId, operatorEmail) {
    logger.info(`Authorization: Basic ${getAuthorizationHeader()}`);
    logger.info(`${getFGKeyEndpoint()}`);
    logger.info(`Authorization: Basic ${getAuthorizationHeader()}`);
    logger.info(`order_id: ${loginId}${getScreeningMID()}`);
    logger.info(`mid: ${getScreeningMID()}`);
    logger.info(`return_url: ${getFrontEndAPIServerAddress()}/payment-result`);
    logger.info(`status_url: ${getFrontEndAPIServerAddress()}/payment-result`);

    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${getAuthorizationHeader()}`,
        };
        const response = await axios.post(`${getFGKeyEndpoint()}`, {
            "payment": {
                "transaction_type": "PAYMENT",
                "order_id": `${loginId}${getScreeningMID()}`,
                "currency": "KRW",
                "amount": "330000",
                "lang": "KR"
            },
            "merchant": {
                "mid": `${getScreeningMID()}`
            },
            "product": [{
                "name": "심사비 결제",
                "quantity": "1"
            }],
            "buyer": {
                "name": `${loginId}`,
                "email": `${operatorEmail}`
            },
            "url": {
                "return_url": `${getFrontEndAPIServerAddress()}/payment-result`,
                "status_url": `${getFrontEndAPIServerAddress()}/payment-result`
            },
            "settings": {
                "display_type": "R"
            }
        }, { headers });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

function getAuthorizationHeader() {
    switch (process.env.ENVIRONMENT) {
        case TEST:
            return AUTHORIZATION_HEADER.test;
        case PROD:
            return AUTHORIZATION_HEADER.prod;
    }
}

function getFGKeyEndpoint() {
    switch (process.env.ENVIRONMENT) {
        case TEST:
            return FG_KEY_ENDPOINT.test;
        case PROD:
            return FG_KEY_ENDPOINT.prod;
    }
}

function getScreeningMID() {
    switch (process.env.ENVIRONMENT) {
        case TEST:
            return SCREENING_MID.test;
        case PROD:
            return SCREENING_MID.prod;
    }
}

function getFrontEndAPIServerAddress() {
    switch (process.env.ENVIRONMENT) {
        case TEST:
            return FRONT_END_SERVER_API_ADDRESS.test;
        case PROD:
            return FRONT_END_SERVER_API_ADDRESS.prod;
    }
}

module.exports = generateFGKey;
