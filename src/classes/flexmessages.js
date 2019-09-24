const numeral = require('numeral');
const dateFormat = require('dateformat');
// xxx
let msgFlex = [{
    type: String,
    altText: String,
    contents: {
        type: String,
        styles: {
          footer: {
            separator: Boolean
          }
        },
        body: {
          type: String,
          layout: String,
          contents: [
            {
              type: String,
              text: String,
              weight: String,
              color: String,
              size: String
            },
            {
              type: String,
              margin: String
            },
            {
              type: String,
              layout: String,
              margin: String,
              spacing: String,
              contents: [{}]
            },
            {
              type: String,
              margin: String
            },
            {
              type: String,
              layout: String,
              margin: String,
              contents: [{}]
            }
          ]
        }
      }
   }];
class flex_message{
    constructor(){}
    getFlexResult(income, expense){
        msgFlex[0].type = 'flex';
        msgFlex[0].altText = 'รายรับ - รายจ่าย';
        msgFlex[0].contents.type = 'bubble';
        msgFlex[0].contents.styles.footer.separator = true;
        msgFlex[0].contents.body.type = 'box';
        msgFlex[0].contents.body.layout = 'vertical';

        msgFlex[0].contents.body.contents[0].type = 'text';
        msgFlex[0].contents.body.contents[0].text = 'รายรับ - รายจ่าย';
        msgFlex[0].contents.body.contents[0].weight = 'bold';
        msgFlex[0].contents.body.contents[0].color = '#1DB446';
        msgFlex[0].contents.body.contents[0].size = 'sm';
        msgFlex[0].contents.body.contents[1].type = 'separator';
        msgFlex[0].contents.body.contents[1].margin = 'xxl';
        msgFlex[0].contents.body.contents[2].type = 'box';
        msgFlex[0].contents.body.contents[2].layout = 'vertical';
        msgFlex[0].contents.body.contents[2].margin = 'xxl';
        msgFlex[0].contents.body.contents[2].spacing = 'sm';
        
        let bodyContents = new Array();
        let _objIncome = {"type": "box","layout": "horizontal","contents": [{"type": "text","text": "รายรับ","size": "sm","color": "#555555","flex": 0},{"type": "text","text": numeral(income).format('0,0'),"size": "sm","color": "#111111","align": "end"}]}
        bodyContents.push(_objIncome)
        let _objExp = {"type": "box","layout": "horizontal","contents": [{"type": "text","text": "รายจ่าย","size": "sm","color": "#555555","flex": 0},{"type": "text","text": numeral(expense).format('0,0'),"size": "sm","color": "#111111","align": "end"}]}
        bodyContents.push(_objExp)

        msgFlex[0].contents.body.contents[2].contents = bodyContents;
        msgFlex[0].contents.body.contents[3].type = 'separator';
        msgFlex[0].contents.body.contents[3].margin = 'xxl';
        msgFlex[0].contents.body.contents[4].type = 'box';
        msgFlex[0].contents.body.contents[4].layout = 'horizontal';
        msgFlex[0].contents.body.contents[4].margin = 'md';

        let _total = parseInt(income) - parseInt(expense)
        let footerContents = new Array();
        let objBodyTotal = {type: "text",text: "คงเหลือ",size: "sm",weight: "bold",color: "#555555",flex: 0}
        let objFooterTotal = {type: "text",text: numeral(_total).format(0,0),color: "#555555",size: "sm",weight: "bold",align: "end"}
        footerContents.push(objBodyTotal);
        footerContents.push(objFooterTotal);

        msgFlex[0].contents.body.contents[4].contents = footerContents;
            
        return msgFlex
    }
    getFlightTicket(objJson){
        msgFlex[0].type = 'flex';
        msgFlex[0].altText = 'ค่าตั๋วเครื่องบิน';
        msgFlex[0].contents.type = 'bubble';
        msgFlex[0].contents.styles.footer.separator = true;
        msgFlex[0].contents.body.type = 'box';
        msgFlex[0].contents.body.layout = 'vertical';

        msgFlex[0].contents.body.contents[0].type = 'text';
        msgFlex[0].contents.body.contents[0].text = 'ค่าตั๋วเครื่องบิน';
        msgFlex[0].contents.body.contents[0].weight = 'bold';
        msgFlex[0].contents.body.contents[0].color = '#1DB446';
        msgFlex[0].contents.body.contents[0].size = 'sm';
        msgFlex[0].contents.body.contents[1].type = 'separator';
        msgFlex[0].contents.body.contents[1].margin = 'xxl';
        msgFlex[0].contents.body.contents[2].type = 'box';
        msgFlex[0].contents.body.contents[2].layout = 'vertical';
        msgFlex[0].contents.body.contents[2].margin = 'xxl';
        msgFlex[0].contents.body.contents[2].spacing = 'sm';

        let _total = 0;
        let bodyContents = new Array();
        for(var myKey in objJson) {
            _total += parseInt(objJson[myKey])
            let _flightDate = new Date(myKey);
            let _obj = {"type": "box","layout": "horizontal","contents": [{"type": "text","text": dateFormat(_flightDate, "dddd, mmmm dS, yyyy"),"size": "sm","color": "#555555","flex": 0},{"type": "text","text": numeral(objJson[myKey]).format('0,0'),"size": "sm","color": "#111111","align": "end"}]}
            bodyContents.push(_obj)
        } 

        msgFlex[0].contents.body.contents[2].contents = bodyContents;
        msgFlex[0].contents.body.contents[3].type = 'separator';
        msgFlex[0].contents.body.contents[3].margin = 'xxl';
        msgFlex[0].contents.body.contents[4].type = 'box';
        msgFlex[0].contents.body.contents[4].layout = 'horizontal';
        msgFlex[0].contents.body.contents[4].margin = 'md';

        let footerContents = new Array();
        let objBodyTotal = {type: "text",text: "รวมทั้งหมด",size: "sm",weight: "bold",color: "#555555",flex: 0}
        let objFooterTotal = {type: "text",text: numeral(_total).format(0,0),color: "#555555",size: "sm",weight: "bold",align: "end"}
        footerContents.push(objBodyTotal);
        footerContents.push(objFooterTotal);

        msgFlex[0].contents.body.contents[4].contents = footerContents;
            
        return msgFlex
    }
    getFlexIncome(objJson){
        msgFlex[0].type = 'flex';
        msgFlex[0].altText = 'รายรับ';
        msgFlex[0].contents.type = 'bubble';
        msgFlex[0].contents.styles.footer.separator = true;
        msgFlex[0].contents.body.type = 'box';
        msgFlex[0].contents.body.layout = 'vertical';

        msgFlex[0].contents.body.contents[0].type = 'text';
        msgFlex[0].contents.body.contents[0].text = 'รายรับ';
        msgFlex[0].contents.body.contents[0].weight = 'bold';
        msgFlex[0].contents.body.contents[0].color = '#1DB446';
        msgFlex[0].contents.body.contents[0].size = 'sm';
        msgFlex[0].contents.body.contents[1].type = 'separator';
        msgFlex[0].contents.body.contents[1].margin = 'xxl';
        msgFlex[0].contents.body.contents[2].type = 'box';
        msgFlex[0].contents.body.contents[2].layout = 'vertical';
        msgFlex[0].contents.body.contents[2].margin = 'xxl';
        msgFlex[0].contents.body.contents[2].spacing = 'sm';

        let _total = 0;
        let bodyContents = new Array();
        for(var myKey in objJson) {
            _total += parseInt(objJson[myKey])
            let _obj = {"type": "box","layout": "horizontal","contents": [{"type": "text","text": myKey,"size": "sm","color": "#555555","flex": 0},{"type": "text","text": numeral(objJson[myKey]).format('0,0'),"size": "sm","color": "#111111","align": "end"}]}
            bodyContents.push(_obj)
        } 

        msgFlex[0].contents.body.contents[2].contents = bodyContents;
        msgFlex[0].contents.body.contents[3].type = 'separator';
        msgFlex[0].contents.body.contents[3].margin = 'xxl';
        msgFlex[0].contents.body.contents[4].type = 'box';
        msgFlex[0].contents.body.contents[4].layout = 'horizontal';
        msgFlex[0].contents.body.contents[4].margin = 'md';

        let footerContents = new Array();
        let objBodyTotal = {type: "text",text: "รายรับทั้งหมด",size: "sm",weight: "bold",color: "#555555",flex: 0}
        let objFooterTotal = {type: "text",text: numeral(_total).format(0,0),color: "#555555",size: "sm",weight: "bold",align: "end"}
        footerContents.push(objBodyTotal);
        footerContents.push(objFooterTotal);

        msgFlex[0].contents.body.contents[4].contents = footerContents;
            
        return msgFlex
    }
    getFlexExpenses(objJson){
        msgFlex[0].type = 'flex';
        msgFlex[0].altText = 'รายจ่าย';
        msgFlex[0].contents.type = 'bubble';
        msgFlex[0].contents.styles.footer.separator = true;
        msgFlex[0].contents.body.type = 'box';
        msgFlex[0].contents.body.layout = 'vertical';

        msgFlex[0].contents.body.contents[0].type = 'text';
        msgFlex[0].contents.body.contents[0].text = 'รายจ่าย';
        msgFlex[0].contents.body.contents[0].weight = 'bold';
        msgFlex[0].contents.body.contents[0].color = '#1DB446';
        msgFlex[0].contents.body.contents[0].size = 'sm';
        msgFlex[0].contents.body.contents[1].type = 'separator';
        msgFlex[0].contents.body.contents[1].margin = 'xxl';
        msgFlex[0].contents.body.contents[2].type = 'box';
        msgFlex[0].contents.body.contents[2].layout = 'vertical';
        msgFlex[0].contents.body.contents[2].margin = 'xxl';
        msgFlex[0].contents.body.contents[2].spacing = 'sm';
           
        let _total = 0;
        let bodyContents = new Array();
        for(var myKey in objJson) {
            _total += parseInt(objJson[myKey])
            let _obj = {"type": "box","layout": "horizontal","contents": [{"type": "text","text": myKey,"size": "sm","color": "#555555","flex": 0},{"type": "text","text": numeral(objJson[myKey]).format('0,0'),"size": "sm","color": "#111111","align": "end"}]}
            bodyContents.push(_obj)
        } 

        msgFlex[0].contents.body.contents[2].contents = bodyContents;
        msgFlex[0].contents.body.contents[3].type = 'separator';
        msgFlex[0].contents.body.contents[3].margin = 'xxl';
        msgFlex[0].contents.body.contents[4].type = 'box';
        msgFlex[0].contents.body.contents[4].layout = 'horizontal';
        msgFlex[0].contents.body.contents[4].margin = 'md';

        let footerContents = new Array();
        let objBodyTotal = {type: "text",text: "รายจ่ายทั้งหมด",size: "sm",weight: "bold",color: "#555555",flex: 0}
        let objFooterTotal = {type: "text",text: numeral(_total).format(0,0),color: "#555555",size: "sm",weight: "bold",align: "end"}
        footerContents.push(objBodyTotal);
        footerContents.push(objFooterTotal);

        msgFlex[0].contents.body.contents[4].contents = footerContents;
            
        return msgFlex
    }
    getFlexHelp(){
        let msghelp = [{
            "type": "flex",
            "altText": "คู่มือการใช้งาน",
            "contents": {
                "type": "bubble",
                "styles": {
                  "footer": {
                    "separator": true
                  }
                },
                "body": {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "text",
                      "text": "คู่มือการใช้งาน",
                      "weight": "bold",
                      "color": "#1DB446",
                      "size": "sm"
                    },
                    {
                      "type": "separator",
                      "margin": "xxl"
                    },
                    {
                      "type": "box",
                      "layout": "vertical",
                      "margin": "xxl",
                      "spacing": "sm",
                      "contents": [
                        {
                          "type": "box",
                          "layout": "horizontal",
                          "contents": [
                            {
                              "type": "text",
                              "text": "บันทึกรายได้ :",
                              "weight": "bold",
                              "size": "sm",
                              "color": "#555555",
                              "flex": 0
                            }
                          ]
                        },
                        {
                          "type": "box",
                          "layout": "horizontal",
                          "contents": [
                            {
                              "type": "text",
                              "text": "พิมพ์ 0 เว้นวรรค รายการ เว้นวรรค จำนวนเงิน",
                              "size": "sm",
                              "color": "#555555"
                            }
                          ]
                        },
                        {
                          "type": "box",
                          "layout": "horizontal",
                          "contents": [
                            {
                              "type": "text",
                              "text": "ตัวอย่าง : 0 เงินเดือน 15000",
                              "size": "sm",
                              "color": "#555555"
                            }
                          ]
                        },
                        {
                          "type": "separator",
                          "margin": "xxl"
                        },
                        {
                          "type": "box",
                          "layout": "vertical",
                          "margin": "xxl",
                          "spacing": "sm",
                          "contents": [
                            {
                              "type": "text",
                              "text": "บันทึกรายจ่าย :",
                              "weight": "bold",
                              "size": "sm",
                              "color": "#555555",
                              "flex": 0
                            }
                          ]
                        },
                        {
                          "type": "box",
                          "layout": "horizontal",
                          "contents": [
                            {
                              "type": "text",
                              "text": "พิมพ์ 1 เว้นวรรค รายการ เว้นวรรค จำนวนเงิน",
                              "size": "sm",
                              "color": "#555555"
                            }
                          ]
                        },
                        {
                          "type": "box",
                          "layout": "horizontal",
                          "contents": [
                            {
                              "type": "text",
                              "text": "ตัวอย่าง : 1 ผ่อนคอนโด 45000",
                              "size": "sm",
                              "color": "#555555"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              }
           }];
           return msghelp;
    }
}
module.exports = new flex_message();