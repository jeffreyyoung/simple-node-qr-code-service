const express = require("express");
const app = express();
const port = 5678;
var QRCode = require("qrcode");

// http://localhost:5678/qrcode.png?data=https://www.youtube.com

app.get("/qrcode.png", (req, res) => {
    const data = decodeURI(req.query.data);
    QRCode.toDataURL(data, {
        width: req.query.width || 200,
        errorCorrectionLevel: 'H'
    }, function(err, base64EncodedPng) {
        if (err) {
            res.err(err);
        }
        var img = Buffer.from(
            base64EncodedPng.replace(/^data:image\/png;base64,/, ''),
            'base64'
        );

        res.writeHead(200, {
            "Content-Type": "image/png",
            "Content-Length": img.length
        });
        res.end(img);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
