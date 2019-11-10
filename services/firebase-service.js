const firebase = require('firebase-admin');
const serviceAccount = require('../json/serviceAccountKey.json');

var db, ref, collection_data, _data;

class FirebaseService {
    constructor() {
        firebase.initializeApp({
            credential: firebase.credential.cert(serviceAccount),
            databaseURL: 'https://line-noti-fc294.firebaseio.com/'
        });

        db = firebase.database();
        ref = db.ref('farm');
        collection_data = db.ref('data');

    }


    checkDuplicate(msg) {
        return new Promise(function (resolve, reject) {
            try {
                return collection_data.once('value', function (snapshot) {
                    var list = [];
                    snapshot.forEach(function (el) {
                        el.forEach(function (el2) {
                            list.push(el2.val());
                        })
                    });
                    var result = list.filter(key => key.answers == msg);
                    return resolve(JSON.stringify(result[0].questions));
                });
            }
            catch (e) {
                return reject(e);
            }
        });
    }

    getFarm() {
        return new Promise(function (resolve, reject) {
            try {
                return ref.once('value', function (snapshot) {
                    let _farm = snapshot.val();
                    return resolve(JSON.stringify(_farm));
                });
            }
            catch (e) {
                return reject(e);
            }
        });
    }

    getData() {
        return new Promise(function (resolve, reject) {
            try {
                return collection_data.once('value', function (snapshot) {
                    let _data = snapshot.val();
                    return resolve(JSON.stringify(_data));
                });
            }
            catch (e) {
                return reject(e);
            }
        });
    }

    getTemp() {
        return new Promise(function (resolve, reject) {
            try {
                let weather = db.ref('weather');
                return weather.once('value', function (snapshot) {
                    let data = snapshot.val();
                    return resolve(JSON.stringify(data.temp));
                });
            }
            catch (e) {
                return reject(e);
            }
        })
    }

    saveData(msg, feedback) {
        return new Promise(function (resolve, reject) {
            try {
                var postsRef = collection_data.child("qa");
                var newPostRef = postsRef.push();
                newPostRef.set({
                    questions: msg[1],
                    answers: feedback[1]
                });
                return resolve(JSON.stringify('saved!'));
            }
            catch (e) {
                return reject(e);
            }
        })
    }

}
module.exports = new FirebaseService();