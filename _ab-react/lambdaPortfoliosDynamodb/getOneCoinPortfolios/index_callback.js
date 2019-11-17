'use strict'
const AWS = require('aws-sdk');

AWS.config.update({ region: "us-east-1" });

exports.handler = function (event, context, callback) {
    const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-8" });

    const params = {
        TableName: "coin_portfolios", 
        Key: {
            id: {
                S: "2",

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
 