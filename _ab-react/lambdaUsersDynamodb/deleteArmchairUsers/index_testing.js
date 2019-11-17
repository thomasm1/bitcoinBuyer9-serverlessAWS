'use strict'
// Circumvents DynamoDB JSON service object...using DocumentClient constructor
// Uses Primary Key String id, and String name (sort key)

const AWS = require('aws-sdk');

// AWS.config.update({ region: "us-east-1" });

exports.handler = async (event, context) => {
    // const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-8" });
    const documentClient = new AWS.DynamoDB.DocumentClient(); // { region: "us-east-1" }

    let responseBody = "";
    let statusCode = 0;

    // const { id  } =  JSON.parse(event.pathParameters); //, name

    const params = {
        TableName: "armchair_users",
        Key: {
              id: "6"  //id //, //"6",
            //  {   S:  "1", }
         
        }
    }



    try {
        // const data =  ddb.getItem(params).promise();
        const data = await documentClient.delete(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 204;
        // console.log(data);
    } catch (err) {
        responseBody  = `Unable to delete user: ${err}`;
        statusCode = 403
        // console.log(err);
    }

    const response = {
        statusCode: statusCode, 
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin":"*"
        },
        body: responseBody
    };
    return response;
}