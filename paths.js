const path = require('path');
const ROOT_PATH = path.join(__dirname);

const DISTRIBUTION_PATH = path.join(ROOT_PATH, "dist");
const INDEX_HTML_PATH = path.join(DISTRIBUTION_PATH, "index.html");
const MASKED_IMAGE_PATH = path.join(ROOT_PATH, "public");
const BIZ_LICENSE_PATH = path.join(ROOT_PATH, "public", "biz-license");

const ENV_PATH = path.join(ROOT_PATH, "environments");
const EMAIL_ACCOUNT_ENV_PATH = path.join(ENV_PATH, "email-account.env");

const LOGGER_PATH = path.join((ROOT_PATH), "logger");

module.exports = {
    ROOT_PATH,
    DISTRIBUTION_PATH,
    INDEX_HTML_PATH,
    MASKED_IMAGE_PATH,
    BIZ_LICENSE_PATH,
    ENV_PATH,
    EMAIL_ACCOUNT_ENV_PATH,
    LOGGER_PATH
};