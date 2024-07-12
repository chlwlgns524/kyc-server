const express = require('express');
const router = express.Router();

router.get('/krp.html', (req, res) => {
    const emptyHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Health Check</title>
    </head>
    <body>
    <h1>Checking...</h1>
    </body>
    </html>
    `;
    res.send(emptyHtml);
});

module.exports = router;