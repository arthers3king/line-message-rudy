const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const port = process.env.PORT || 4000
const admin = require('firebase-admin');
const lineMessaging = require('./views/line-message');


express()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .get('/', (req, res) => res.send(`Apis running on PORT: ${port}`))
    .post('/webhook', function (req, res) {
        let replyToken = req.body.events[0].replyToken;
        let message = req.body.events[0].message.text;

        lineMessaging.replyMessage(replyToken, message).then(function (rs) {

            console.log(`Reply message : ${rs}`);

            res.json({
                status: 200,
                message: `Sent message!`
            });
        });
    })
    .listen(port, () => console.log(`Listening on ${port}`));
