'use strict'
const AWS = require('aws-sdk');

AWS.config.update({ region: "us-east-1" });

exports.handler = function (event, context, callback) {
    const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-8" });

    const params = {
        TableName: "prices_bitcoin", 
        Key: {
            Date: {
                S: "2019-11-06",

            }
        }
    }

    ddb.getItem(params, (err, data) => {
        if(err) {
            console.log(err);
        }
        console.log(data);
    })
}

// RESPONSE:::
// START RequestId: 54b79e4f-500d-4358-addb-e0e90e3b826f Version: $LATEST
// 2019-11-08T04:23:59.411Z	54b79e4f-500d-4358-addb-e0e90e3b826f	INFO	{ Item:
//    { Close: { N: '9361.54' },
//      Date: { S: '2019-11-06' },
//      Low: { N: '9282.08' },
//      High: { N: '9450' },
//      'Volume USD': { N: '32366350.77' },
//      Open: { N: '9322.09' },
//      Symbol: { S: 'BTCUSD' },
//      'Volume BTC': { N: '3462.61' } } }
// END RequestId: 54b79e4f-500d-4358-addb-e0e90e3b826f
// REPORT RequestId: 54b79e4f-500d-4358-addb-e0e90e3b826f	Duration: 1229.91 ms	Billed Duration: 1300 ms	Memory Size: 128 MB	Max Memory Used: 94 MB	Init Duration: 363.65 ms	
