const { ENV_PATH, DISTRIBUTION_PATH, INDEX_HTML_PATH, LOGGER_PATH } = require('./paths');
require('dotenv').config({ path: `${ENV_PATH}/exec.env` });

const logger = require(LOGGER_PATH);
const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.use(require('./routes/health-checker'));
app.use(express.static(DISTRIBUTION_PATH));

const { FRONT_END_SERVER_API_ADDRESS } = require('./utils/api-const');
app.use(`/${FRONT_END_SERVER_API_ADDRESS.prefix}`, require("./middlewares/beforeAfterLogginMiddleware"));

const apiRouter = express.Router();
app.use(`/${FRONT_END_SERVER_API_ADDRESS.prefix}`, apiRouter);
apiRouter.use(require('./routes/verify'));
apiRouter.use(require('./routes/ekyc'));
apiRouter.use(require('./routes/fgkey'));
apiRouter.use(require('./routes/payment-result'));
apiRouter.use(require('./routes/mask'));

app.get('*', (req, res) => {
    res.sendFile(INDEX_HTML_PATH);
});

const setUpGlobalExceptionHandler = require('./exceptions/globalException');
setUpGlobalExceptionHandler();

const PORT = process.env.PORT;
app.listen(PORT, () => {
    logger.debug('*******************************************************************');
    logger.debug(`KYC ${process.env.ENVIRONMENT} is running on PORT: ${PORT}`);
    logger.debug('*******************************************************************\n');
});