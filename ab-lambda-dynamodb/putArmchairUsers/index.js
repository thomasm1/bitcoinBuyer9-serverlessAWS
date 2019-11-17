'use strict'
// Circumvents DynamoDB JSON service object...using DocumentClient constructor
// Uses Primary Key String id, and String name (sort key)

const AWS = require('aws-sdk');

// AWS.config.update({ region: "us-east-1" });

exports.handler = async (event, context) => {
    // const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-8" });
    const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

    let responseBody = "";
    let statusCode = 0;

    const { id, 
    uid, 
    name, 
    firstname, 
    lastname, 
    email, 
    phone, 
    contactType, 
    userGroup, 
    dateOfBirth, 
    isActive,
    photoPath } = JSON.parse(event.body);

    const params = {
        TableName: "armchair_users",
        Item: {
            id: id, //"2",
            uid: uid,//"DF3r1iqZzOWJaMfuzyjTDCckCnn1",
            name: name,// "Thomas Milton",
            firstname: firstname, //"Thomas",
            lastname: lastname, ///"Milton",
            email: email, //"thomas.maestas@hotmail.com",
            phone: phone, //5055087707,
            contactType: contactType,//"phone",
            userGroup: userGroup, //"3",
            dateOfBirth: dateOfBirth,//"1917-09-03",
            isActive: isActive,//false,
            photoPath: photoPath//"https://tmm-nov.s3.amazonaws.com/data/media/Charlemagne.jpg" 
        }
    }


    try {
        // const data =  ddb.getItem(params).promise();
        const data = await documentClient.put(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 201;
        // console.log(data);
    } catch (err) {
        responseBody  = `Unable to put product: ${err}`;
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
 