'use strict'
// Using Async, not callback...

const AWS = require('aws-sdk');

AWS.config.update({ region: "us-east-1" });

exports.handler = async /*function*/(event, context) => { // , callback) {
    // const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-8" });
    const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" }); 

    let responseBody = "";
    let statusCode = 0;

    const { Date } = event.pathParameters;

    const params = {
        TableName: "prices_ethereum",
        Key: {
            Date: Date 
        }
    }

  try {
    // const data =  ddb.getItem(params).promise();
    const data = await documentClient.get(params).promise();
    responseBody = JSON.stringify(data.Item);  // double-check data.Item
    statusCode = 200;
    console.log(data);
  } catch (err) {
    responseBody = `Unable to get ETH price: ${err}`;
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


// RESPONSE:::
//START RequestId: 8e2e57dd-2d3d-43d1-8c2c-ebb821458d55 Version: $LATEST
// 2019-11-08T04:38:08.038Z	8e2e57dd-2d3d-43d1-8c2c-ebb821458d55	INFO	{ Item:
//    { Close: { N: '9361.54' },
//      Date: { S: '2019-11-06' },
//      Low: { N: '9282.08' },
//      High: { N: '9450' },
//      'Volume USD': { N: '32366350.77' },
//      Open: { N: '9322.09' },
//      Symbol: { S: 'BTCUSD' },
//      'Volume BTC': { N: '3462.61' } } }
// END RequestId: 8e2e57dd-2d3d-43d1-8c2c-ebb821458d55
// REPORT RequestId: 8e2e57dd-2d3d-43d1-8c2c-ebb821458d55	Duration: 1213.77 ms	Billed Duration: 1300 ms	Memory Size: 128 MB	Max Memory Used: 93 MB	Init Duration: 379.09 ms	
