'use strict'
// Circumvents DynamoDB JSON service object...using DocumentClient constructor
// Uses Primary Key String id, and String name (sort key)

const AWS = require('aws-sdk');

AWS.config.update({ region: "us-east-1" });

exports.handler = async (event, context) => {
    // const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-8" });
    const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

    const params = {
        TableName: "coin_portfolios",
        Item: {
            id: "2", 
            username: "thomas.maestas@hotmail.com" ,
            firstname: "Thomas",
            lastname: "Milton",  
            userGroup: "3", 
            isActive: false, 
            coinPortfolio: ['BTC','ETH'],
            groupsAccess: ['2','3','5'],
            groupsNumeric: [2,3,5]
        }
    }


    try {
        // const data =  ddb.getItem(params).promise();
        const data = await documentClient.put(params).promise();
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}
 