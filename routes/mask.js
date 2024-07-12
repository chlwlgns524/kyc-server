const { LOGGER_PATH, MASKED_IMAGE_PATH } = require('../paths');
const logger = require(LOGGER_PATH);
const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');
const uploadPath = path.join(__dirname, '../', 'public');

const multer = require('multer');
const storage = multer.diskStorage(
        {
            destination: function (req, file, cb) {
                if (!fs.existsSync(uploadPath))
                    fs.mkdirSync(uploadPath);
                cb(null, uploadPath);
            },
            filename: function (req, file, cb) {
                cb(null, `${Date.now()}-${file.fieldname}`);
            }
        }
);

const upload = multer({storage: storage});
const Jimp = require("jimp");
router.use(express.static(uploadPath));
router.use(express.json());

router.get('/mask', (req, res) => {
    const fileName = req.query.fileName;
    const filePath = path.join(MASKED_IMAGE_PATH, fileName);

    if (fs.existsSync(filePath)) {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                logger.error('Error occured reading file -> ', err);
                res.status(500).send('Internal Server Error');
            } else {
                const base64Image = Buffer.from(data).toString('base64');
                res.json({ image: base64Image });
                // 이미지 응답 후에 파일 삭제
                /*
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                    } else {
                        console.log('File deleted successfully');
                    }
                });
                 */
            }
        });
    } else {
        res.status(404).send('File not found');
    }
});

router.post('/mask', upload.single('image'), async (req, res) => {
    try {
        const file = req.file;
        const coordinates = JSON.parse(req.body.coordinates);
        const fileName = await blurRegion(file, coordinates);
        res.status(200).send(fileName);
    } catch (error) {
        logger.error(error.toString());
        res.status(500).send('Error processing image.');
    }
});

async function blurRegion(file, coordinates) {
    const { promisify } = require('util');
    const unlinkAsync = promisify(fs.unlink);

    try {
        const image = await Jimp.read(file.path);

        for (const coordinate of coordinates) {
            const minX = Math.min(coordinate[0].x, coordinate[1].x, coordinate[2].x, coordinate[3].x);
            const minY = Math.min(coordinate[0].y, coordinate[1].y, coordinate[2].y, coordinate[3].y);
            const maxX = Math.max(coordinate[0].x, coordinate[1].x, coordinate[2].x, coordinate[3].x);
            const maxY = Math.max(coordinate[0].y, coordinate[1].y, coordinate[2].y, coordinate[3].y);
            const width = maxX - minX;
            const height = maxY - minY;

            const region = image.clone().crop(minX, minY, width, height).blur(50);
            image.composite(region, minX, minY);
        }
        const fileName = `masked_${file.filename}.jpg`;
        const finalPath = `${file.destination}/${fileName}`;

        logger.info(`${fileName} has been synthesized successfully.`);

        await image.writeAsync(finalPath);
        await unlinkAsync(file.path);

        logger.info(`${fileName} has been deleted successfully.`);

        return fileName;
    } catch (error) {
        logger.error(error.toString());
    }
}

module.exports = router;