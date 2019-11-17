'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();
  let responseBody = "";
  let statusCode = 0;

  const { id, name } = JSON.parse(event.body);

  const params = {
    TableName: "coin_portfolios",
    Key: {
      id: id 
    },
    UpdateExpression: "set name = :n", // TODO: EXPAND UPDATES!!
    ExpressionAttributeValues: {
      ":n": name
    },
    ReturnValues: "UPDATED_NEW"
  };

  try {
    const data = await documentClient.update(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 204;
  } catch(err) {
    responseBody = `Unable to update coin portfolios: ${err}`;
    statusCode = 403;
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