'use strict' 
const AWS = require('aws-sdk');
 
exports.handler = async (event, context) => { 
    const documentClient = new AWS.DynamoDB.DocumentClient(); // { region: "us-east-1" }

    let responseBody = "";
    let statusCode = 0;

    const { id, name  } =   event.pathParameters ; // TODO!! remove sort key

    const params = {
        TableName: "coin_portfolios",
        Key: {
            id: id, 
            name: name 
        }
    };

    try { 
        const data = await documentClient.delete(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 204;
        console.log(data);
    } catch (err) {
        responseBody  = `Unable to delete coin portfolios: ${err}`;
        statusCode = 403
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
}