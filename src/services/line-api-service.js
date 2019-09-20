const request = require('request');
const apiToken = 'gGBrmlRbYR2Mq1IzxEwG0OVQr2XmFeyI8b9Cb6ydeF/kea8/o1Y+QXSX1laBGebLeSp+70NAG7M7cd04icln+lTuSFvneSFMO9Pd3kXCAnLJQPOPjxhRdqstyPRMttFDyZ+BGlNc8KDYc6AVF5orlgdB04t89/1O/w1cDnyilFU=';
const apiRoute = 'https://api.line.me/v2/bot/message/reply';
const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + apiToken
};
class LineAPIService{
    constructor(){}
    reply(replyToken, messages){
        return new Promise((resolve, reject) => {
            try{
                let body = JSON.stringify({
                    replyToken: replyToken,
                    messages: messages
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
            catch(e){
                return reject(e);
            }
        });
    }
}
module.exports = new LineAPIService();