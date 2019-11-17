'use strict' 
const AWS = require('aws-sdk');
 
exports.handler = async (event, context) => { 
    const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

    let responseBody = "";
    let statusCode = 0;

    const { 
    id,   
    portfolioId,   
    username,
    firstname, 
    lastname,   
    userGroup,  
    isActive,
    coinPortfolio,
    groupsAccess,
    groupsNumeric 
    } = JSON.parse(event.body);

    const params = {
        TableName: "coin_portfolios",
        Item: {
            id: id,
            portfolioId: portfolioId,   
            username: username,
            firstname: firstname, 
            lastname: lastname,   
            userGroup: userGroup,  
            isActive: isActive, 
            coinPortfolio: coinPortfolio,
            groupsAccess: groupsAccess,
            groupsNumeric: groupsNumeric
        }
    };


    try { 
        const data = await documentClient.put(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 201;
        // console.log(data);
    } catch (err) {
        responseBody  = `Unable to put coin portfolio: ${err}`;
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
 