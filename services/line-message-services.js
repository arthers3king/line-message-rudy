
const request = require('request');
const apiRoute = 'https://api.line.me/v2/bot/message/reply';
const token = 'YpAXzQr9GXpOkk3Q0sP84RkaGdh7qvba78vlFsqObcuDC6W0aSToJ624j0n+Az/CNTDxVr65IBc1gXu4WGJ7Q/LMFNrEiQPPT94jYCuYICaLJYyvCMonmhu4p1aN3HhRRaP3YOiCcXgO0oOenm8E6AdB04t89/1O/w1cDnyilFU=';
const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
}

class LineAPIService {
    constructor() { }

    reply(reply_token, msg) {
        
        return new Promise(function (resolve, reject) {
            try {
                let body = JSON.stringify({
                    replyToken: reply_token,
                    messages: msg
                })
                return request.post({
                    url: apiRoute,
                    headers: headers,
                    body: body
                }, (err, res, body) => {
                    console.log('status = ' + res.statusCode);
                    return resolve(res.statusCode);
                });
            }
            catch (e) {
                return reject(e);
            }
        });
    }
}

module.exports = new LineAPIService();