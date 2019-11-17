'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;

  const params = {
    TableName: "armchair_users",
    Key: {
      id: "1" 
    },

    UpdateExpression: "set username = :n",  
    ExpressionAttributeValues: {
      ":n": "updatedUserName"
    },
    ReturnValues: "UPDATED_NEW"
  };

  try {
    const data = await documentClient.update(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 204;
  } catch(err) {
    responseBody = `Unable to update user: ${err}`;
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    },
    body: responseBody
  };

  return response;
};
