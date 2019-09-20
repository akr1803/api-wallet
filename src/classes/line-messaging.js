const lineApiService = require('../services/line-api-service');
const firebase_service = require('../services/firebase-service');
const flexmessage = require('../classes/flexmessages');
const numeral = require('numeral');
// add new branch
class LineMessaging{
    constructor(){}
    replyMessage(replyToken, message, userid){
        return new Promise((resolve, reject) => {
            let akr;
            try {
                let _msg = [{
                    type: 'text',
                    text: message
                }];
                let str = message.split(' ');
                if (str.length > 1){
                    if(str[0] === '0'){ // ประเภทรายได้
                        return firebase_service.setWallet('income', str[1], str[2], userid).then((rs) => {
                            let _income = this.income_result(rs);
                            return lineApiService.reply(replyToken, _income).then((r) => {
                                return resolve(r)
                            })
                        })
                    }else if(str[0] === '1'){ //ประเภทรายจ่าย
                        return firebase_service.setWallet('expenses', str[1], str[2], userid).then((rs) => {
                            let _expenses = this.expense_result(rs);
                            return lineApiService.reply(replyToken, _expenses).then((r) => {
                                return resolve(r)
                            })
                        })
                    }
                }else{
                    if(str[0] === 'ticket'){
                        return firebase_service.getFlightTicket().then((rs) => {
                            let objJson = JSON.parse(rs)
                            let flightmsg = flexmessage.getFlightTicket(objJson);
                            return lineApiService.reply(replyToken, flightmsg).then((r) => {
                                return resolve(r)
                            });
                        });
                    }else if(str[0] === 'clear'){
                        _msg[0].text = 'เริ่มต้นบันทึกรายรับ-รายจ่ายใหม่.';
                        return firebase_service.createNode(userid).then((r) => {
                            if(r){
                                return lineApiService.reply(replyToken, _msg).then((rs) => {
                                    return resolve(rs);
                                });
                            }
                        })
                    }else if(str[0] === 'result'){
                        return firebase_service.getIncome(userid).then((rs) => {
                            let objIncome = JSON.parse(rs);
                            let _totalIncome = 0;
                            for(var myKey in objIncome){
                                _totalIncome += parseInt(objIncome[myKey]);
                            }

                            return firebase_service.getExpense(userid).then((rs) => {
                                let objExpense = JSON.parse(rs);
                                let _totalExpense = 0;
                                for(var myKey in objExpense) {
                                    _totalExpense += parseInt(objExpense[myKey])
                                } 

                                let result_msg = flexmessage.getFlexResult(_totalIncome,_totalExpense);
                                return lineApiService.reply(replyToken, result_msg).then((r) => {
                                    return resolve(r)
                                })
                            })
                        })
                    }else if(str[0] === 'follow'){
                        _msg[0].text = 'welcome to my-wallet application.';
                        return firebase_service.createNode(userid).then((r) => {
                            if(r){
                                return lineApiService.reply(replyToken, _msg).then((rs) => {
                                    return resolve(rs);
                                });
                            }
                        })
                    }else if(str[0] === 'help'){
                        let msghelp = flexmessage.getFlexHelp();
                        return lineApiService.reply(replyToken, msghelp).then((rs) => {
                            return resolve(rs);
                        });
                    }else if(str[0] === 'income'){
                        return firebase_service.getIncome(userid).then((rs) => {
                            let _income = this.income_result(rs);
                            return lineApiService.reply(replyToken, _income).then((r) => {
                                return resolve(r)
                            })
                        })
                    }else if(str[0] === 'expenses'){
                        return firebase_service.getExpense(userid).then((rs) => {
                            let _expenses = this.expense_result(rs);
                            return lineApiService.reply(replyToken, _expenses).then((r) => {
                                return resolve(r)
                            })
                        })
                    }else{
                        _msg[0].text = 'Wrong format! Please enter new word.';
                        return lineApiService.reply(replyToken, _msg).then((rs) => {
                            return resolve(rs);
                        });
                    }
                }
            }
            catch(e){
                return reject(e)
            }
        });
    }
    // สรุปรายจ่าย
    expense_result(obj){
        let objJson = JSON.parse(obj)
        let msg_expense = flexmessage.getFlexExpenses(objJson);
        return msg_expense;
    }
    // สรุปรายได้
    income_result(obj){
        let objJson = JSON.parse(obj)
        let msg_income = flexmessage.getFlexIncome(objJson);
        return msg_income;
    }
}
module.exports = new LineMessaging();