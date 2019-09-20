const firebase = require('firebase-admin');
const serviceAccount = require('../../my-wallet-74c8c-firebase-admin.json');
var db;
class FirebaseService{
    constructor(){
        firebase.initializeApp({
            credential: firebase.credential.cert(serviceAccount),
            databaseURL: 'https://my-wallet-74c8c.firebaseio.com/'
        });
        db = firebase.database();
    }
    createNode(userid){
        let dbuser = db.ref('users');
        return new Promise((resolve, reject) => {
            try{
                dbuser.child(userid).child("wallet").child("income").set(0);
                dbuser.child(userid).child("wallet").child("expenses").set(0);
                return resolve(true);
            }catch(e){
                return reject(e)
            }
        })
    }
    getFlightTicket(){
        let dbref = db.ref('flight_ticket');
        return new Promise((resolve, reject) => {
            try{
                return dbref.once('value', (snapshot) => {
                    let _mval = snapshot.val();
                    return resolve(JSON.stringify(_mval));
                });
            }catch(e){
                return reject(e)
            }
        })
    }
    setWallet(wType, obj, mval, userid){
        if (wType === 'income'){
            let dbref = db.ref('users/' + userid + '/wallet/income/' + obj);
            dbref.set(mval);
            return new Promise((resolve, reject) => {
                try{
                    return resolve(this.getIncome(userid))
                }catch(e){
                    return reject(e)
                }
            })
        }else if(wType === 'expenses'){
            let dbref_expenses = db.ref('users/' + userid + '/wallet/expenses');
            return new Promise((resolve, reject) => {
                try{
                    return dbref_expenses.once('value', (snapshot) => {
                        let objVal = snapshot.val();
                        if(objVal.hasOwnProperty(obj)){
                            let _val = parseInt(objVal[obj]) + parseInt(mval)
                            let dbref = db.ref('users/' + userid + '/wallet/expenses/' + obj);
                            dbref.set(_val);
                        }else{
                            let dbref = db.ref('users/' + userid + '/wallet/expenses/' + obj);
                            dbref.set(mval);
                        }
                        return resolve(this.getExpense(userid))
                    });
                }catch(e){
                    return reject(e)
                }
            })
        }
    }
    getIncome(userId){
        let dbref_income = db.ref('users/' + userId + '/wallet/income');
        return new Promise((resolve, reject) => {
            try{
                return dbref_income.once('value', (snapshot) => {
                    let objResp = snapshot.val();
                    return resolve(JSON.stringify(objResp));
                });
            }catch(e){
                return reject(e)
            }
        })
    }
    getExpense(userId){
        let dbref_expenses = db.ref('users/' + userId + '/wallet/expenses');
        return new Promise((resolve, reject) => {
            try{
                return dbref_expenses.once('value', (snapshot) => {
                    let objResp = snapshot.val();
                    return resolve(JSON.stringify(objResp))
                });
            }catch(e){
                return reject(e)
            }
        })
    }
}
module.exports = new FirebaseService();