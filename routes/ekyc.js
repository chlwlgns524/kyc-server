const {LOGGER_PATH, BIZ_LICENSE_PATH, ID_CARD_PATH} = require('../paths');
const logger = require(LOGGER_PATH);
const express = require('express');
const router = express.Router();

const multer = require("multer");
const utils = require("../utils/utils");
const FormData = require("form-data");
const axios = require("axios");
const fs = require("fs");
const iconv = require('iconv-lite');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let dir;
        if (req.originalname.includes('/ekyc/biz-license'))
            dir = BIZ_LICENSE_PATH;
        else if (req.originalname.includes('/ekyc/id-card'))
            dir = ID_CARD_PATH;
        else
            return cb(new Error('Invalid path'), false);

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        const decodedFilename = iconv.decode(Buffer.from(file.originalname, 'binary'), 'utf-8');
        cb(null, `${Date.now()}-${decodedFilename}`);
    }
});
const upload = multer({storage: storage});
const postLoggerDecorator = require("../decorators/loggerDecorator");

router.post('/ekyc/:type/:action', upload.single('file'), postLoggerDecorator(async (req, res) => {
    const uploadedFile = req.file;

    if (!uploadedFile) {
        logger.warn("Uploaded file is undefined");
        return res.status(400).json({ error: "No file uploaded" });
    }

    logger.info(`file -> ${JSON.stringify(getFileLogContent(uploadedFile), null, 2)}`);
    const extension = utils.extractExtensionFromFileName(uploadedFile.originalname);

    try {
        const {type, action} = req.params;
        let path;
        if (type === 'biz-license' || type === 'id-card') {
            path = `${type}/${action}`;
        } else {
            return res
                    .status(400)
                    .json({error: 'Invalid type parameter'});
        }

        const message = {
            requestId: `string${new Date().getTime()}`,
            timestamp: new Date().getTime(),
            images: [
                {
                    format: extension,
                    name: iconv.decode(Buffer.from(uploadedFile.originalname, 'binary'), 'utf-8')
                }
            ]
        };

        const formData = new FormData();
        const filePath = `${BIZ_LICENSE_PATH}/${uploadedFile.filename}`;
        const fileBuffer = fs.readFileSync(filePath);
        formData.append('file', fileBuffer, { filename: uploadedFile.originalname });
        formData.append('message', JSON.stringify(message));

        const baseUrl = (type === 'id-card' ?
                `https://de9vsyog6j.apigw-pub.fin-ntruss.com/ekyc/v1/1401/9c660a2a15023a887a9ba74ce6a59b54bb7655e0e952d93fee43dd4ec0f9307c/${path}` :
                `https://de9vsyog6j.apigw-pub.fin-ntruss.com/ekyc/v1/1310/d933544d785c81e212e9ebf61faf294b2013d4ff7aaa2d8b3edae74151d29cb1/${path}`);
        const apiResponse = await axios.post(
                baseUrl,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-EKYC-SECRET': type === 'id-card' ? 'd25RaHRZeGVoSnpGaWZFWEF4eVR0SklhaUV2akF3U04=' : 'cE9QdFNKR2pKWlBacGpaY01ZT0dNV09NQmxibGtnbm0='
                    }
                }
        );
        res.json(apiResponse.data);
    } catch (error) {
        logger.warn(error.toString());
        res
                .status(400)
                .json(error.response ? error.response.data.code : 'xxxx');
    }
}));

function getFileLogContent(file) {
    const originalNameBuffer = Buffer.from(file.originalname, 'binary');
    const originalName = iconv.decode(originalNameBuffer, 'utf-8');
    return {
        "originalname": originalName,
        "encoding": file.encoding,
        "mimetype": file.mimetype,
        "size": `${file.size / (2 ** 20)}MB`
    };
}

module.exports = router;