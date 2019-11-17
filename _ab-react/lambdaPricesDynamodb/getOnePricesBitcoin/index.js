'use strict'
// Using Async, not callback...

const AWS = require('aws-sdk');

AWS.config.update({ region: "us-east-1" });

exports.handler = async (event, context) => {  
     
  const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

  let responseBody = "";
  let statusCode = 0;

  const { Date } = event.pathParameters;

    const params = {
        TableName: "prices_bitcoin",
        Key: {
            Date: Date // '2019-11-06'
        }
    }

  try { 
    const data = await documentClient.get(params).promise();
    responseBody = JSON.stringify(data.Item);  // double-check data.Item
    statusCode = 200;
    console.log(data);
  } catch (err) {
    responseBody = `Unable to get BTC price: ${err}`;
    statusCode = 403;
    console.log(err);
  }
  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
      "access-control-allow-origin": "*"
    },
    body: responseBody
  };

  return response;
}
 