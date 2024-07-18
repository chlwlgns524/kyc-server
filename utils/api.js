const { LOGGER_PATH } = require('../paths');
const logger = require(LOGGER_PATH);

const axios = require("axios");
const {BACK_END_SERVER_ADDRESS, getBackEndServerAddress} = require("./api-const");

const apiClinet = axios.create({
    baseURL: getBackEndServerAddress()
});

async function payScreeningFee(loginId) {
    try {
        return await apiClinet.post(`/onboarding/v1/register/account/paid/info?loginId=${loginId}`, {});
    }
    catch (error) {
        logger.error(error);
    }
}

module.exports = {
    payScreeningFee,

}