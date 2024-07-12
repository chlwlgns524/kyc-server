const TEST = "TEST";
const PROD = "PROD";

const FRONT_END_SERVER_API_ADDRESS = {
    prefix: "front-api",
    test: function() {
        return `http://15.165.28.190:5173/${this.prefix}`;
    }(),
    prod: function() {
        return `https://pgonline.eximbay.com/${this.prefix}`;
    }()
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
}