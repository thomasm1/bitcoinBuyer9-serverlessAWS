'use strict'
const AWS = require('aws-sdk');

AWS.config.update({ region: "us-east-1" });

exports.handler = function (event, context, callback) {
    // const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-8" });
  const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

  let responseBody = "";
  let statusCode = 0;

  const { Date } = event.pathParameters;

   const params = {
        TableName: "prices_ethereum", 
        Key: {
            Date:  "2019-11-06",// Date
        }
    }

  try {
    // const data =  ddb.getItem(params).promise();
    const data = await documentClient.get(params).promise();
    responseBody = JSON.stringify(data.Item);  // double-check data.Item
    statusCode = 200;
    console.log(data);
  } catch (err) {
    responseBody = `Unable to get price: ${err}`;
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

 