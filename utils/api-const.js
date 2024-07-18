const TEST = "TEST";
const PROD = "PROD";

const FRONT_END_SERVER_API_ADDRESS = {
    prefix: "front-api",
    test: `http://15.165.28.190:5173/front-api`,
    prod: `https://pgonline.eximbay.com/front-api`
};
const FRONT_END_SERVER_ADDRESS = {
    test: "http://15.165.28.190:5173",
    prod: "https://pgonline.eximbay.com"
};
const BACK_END_SERVER_ADDRESS = {
    test: "https://internal-api.eximbay.com/api",
    prod: "https://pgonline.eximbay.com/api"
};
const SDK_SCRIPT_SRC = {
    test: "https://api-test.eximbay.com/v1/javascriptSDK.js",
    prod: "https://api.eximbay.com/v1/javascriptSDK.js"
};
const AUTHORIZATION_HEADER = {
    test: "dGVzdF8xODQ5NzA1QzY0MkMyMTdFMEIyRDo=",
    prod: "bGl2ZV8yOUZCNTIxQjRCMjhBQTI5MUJBQzo="
};
const FG_KEY_ENDPOINT = {
    test: "https://api-test.eximbay.com/v1/payments/ready",
    prod: "https://api.eximbay.com/v1/payments/ready"
};
const SCREENING_MID = {
    test: "1849705C64",
    prod: "29FB521B4B"
};

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

function getBackEndServerAddress() {
    switch (process.env.ENVIRONMENT) {
        case TEST:
            return BACK_END_SERVER_ADDRESS.test;
        case PROD:
            return BACK_END_SERVER_ADDRESS.prod;
    }
}

module.exports = {
    TEST,
    PROD,
    FRONT_END_SERVER_ADDRESS,
    FRONT_END_SERVER_API_ADDRESS,
    BACK_END_SERVER_ADDRESS,
    SDK_SCRIPT_SRC,
    AUTHORIZATION_HEADER,
    FG_KEY_ENDPOINT,
    SCREENING_MID,
    getAuthorizationHeader,
    getFGKeyEndpoint,
    getScreeningMID,
    getFrontEndAPIServerAddress,
    getBackEndServerAddress
}