'use strict'
// Circumvents DynamoDB JSON service object...using DocumentClient constructor
// Uses Primary Key String id, and String name (sort key)

const AWS = require('aws-sdk');

// AWS.config.update({ region: "us-east-1" });

exports.handler = async (event, context) => { 
    const documentClient = new AWS.DynamoDB.DocumentClient(); //{ region: "us-east-1" }

    const params = {
        TableName: "coin_portfolios"
    }

    try {
        // const data =  ddb.getItem(params).promise();
        const data = await documentClient.scan(params).promise();
        responseBody = JSON.stringify(data.Items);
        statusCode = 200;
        console.log(data);
    } catch (err) {
        responseBody = `Unable to get coin portfolios: ${err}`;
        statusCode = 403;
        console.log(err);
    }  
     const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json"
    },
    body: responseBody
  };

  return response;
};
 