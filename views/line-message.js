const lineApiService = require('../services/line-message-services');
const firebaseService = require('../services/firebase-service');

class LineMessaging {
    constructor() {
    }

    replyMessage(reply_token, msg) {
        return new Promise(function (resolve, reject) {
            try {
                let messages = [{
                    type: 'text',
                    text: msg
                }];

                if (msg == 'temps') {
                    return firebaseService.getTemp().then(function (rsf) {
                        messages[0].text = 'อุณหภูมิล่าสุด = ' + rsf;
                        return lineApiService.reply(reply_token, messages).then(function (rs) {
                            return resolve(rs);
                        });
                    })
                } else if (msg == 'list') {
                    return firebaseService.getData().then(function (rsf) {
                        messages[0].text = 'list of Data = ' + rsf
                        return lineApiService.reply(reply_token, messages).then(function (rs) {
                            return resolve(rs);
                        });
                    })
                } else {

                    let data = messages[0].text.split(',');
                    let save_arr = data.filter(item => item.indexOf('save=') > -1);
                    let feedback_arr = data.filter(item => item.indexOf('feedback=') > -1);

                    let saveArray = save_arr[0].split('=')
                    let feedbackArray = feedback_arr[0].split('=')

                    return firebaseService.saveData(saveArray, feedbackArray).then(function (rsf) {
                        // return resolve(rsf);
                        messages[0].text = 'ok saved!';
                        return lineApiService.reply(reply_token, messages).then(function (rs) {
                            return resolve(rs);
                        });
                    });
                }
            }
            catch (e) {
                return reject(e);
            }
        });
    }
}
module.exports = new LineMessaging();