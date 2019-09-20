const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 5000
const lineMessaging = require('./src/classes/line-messaging');
const firebaseService = require('./src/services/firebase-service');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/', (req, res) => res.send(`Hi there! This is a nodejs-line-api running on PORT: ${ port }`))
// เพิ่มส่วนของ line Webhook 
app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken;
    let msg = '';
    let userId = req.body.events[0].source.userId
    let type = req.body.events[0].type
    let breply = true;
    if (type === 'follow'){
        if(firebaseService.createNode(userId)){
            msg = 'follow';
        }else{
            msg = 'Error while create new follow.';
        }
    }else if(type === 'unfollow'){
        breply = false;
    }else{
        msg = req.body.events[0].message.text;
    }
    if(breply){
        lineMessaging.replyMessage(reply_token, msg, userId).then((rs) => {
            console.log(`Reply message result : ${ rs }`);
            res.json({
                status: 200,
                message: 'Sent message!'
            });
        });
    }
    
})
app.listen(port, () => console.log(`Listening on ${ port }`));