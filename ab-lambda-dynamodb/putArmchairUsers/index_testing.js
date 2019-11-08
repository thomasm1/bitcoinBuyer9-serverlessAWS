'use strict'
// Circumvents DynamoDB JSON service object...using DocumentClient constructor
// Uses Primary Key String id, and String name (sort key)

const AWS = require('aws-sdk');

AWS.config.update({ region: "us-east-1" });

exports.handler = async (event, context) => {
    // const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-8" });
    const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

    const params = {
        TableName: "armchair_users",
        Item: {
            id: "2",
            uid: "DF3r1iqZzOWJaMfuzyjTDCckCnn1",
            name: "Thomas Milton",
            firstname: "Thomas",
            lastname: "Milton",
            email: "thomas.maestas@hotmail.com",
            phone: 5055087707,
            contactType: "phone",
            userGroup: "3",
            dateOfBirth: "1917-09-03",
            isActive: false,
            photoPath: "https://tmm-nov.s3.amazonaws.com/data/media/Charlemagne.jpg"
            // photoPath: "https://tmm-nov.s3.amazonaws.com/data/media/TomPicUpload.jpg"
        }
    }


    try {
        // const data =  ddb.getItem(params).promise();
        const data = await documentClient.put(params).promise();
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}

// START RequestId: 46587c57-ff3f-4a53-9772-b206f6634f25 Version: $LATEST
// 2019-11-08T04:48:39.936Z	46587c57-ff3f-4a53-9772-b206f6634f25	INFO	{ Item:
//    { userGroup: '5',
//      isActive: true,
//      contactType: 'email',
//      photoPath: 'assets/images/a.png',
//      dateOfBirth: '2020-09-03',
//      id: '1',
//      email: 'thomasm1.maestas@gmail.com',
//      uid: 'PW3r1iqZzOWJaMfuzyjTDCckCnn1',
//      phone: 5055087707,
//      name: 'Tom' } }
// END RequestId: 46587c57-ff3f-4a53-9772-b206f6634f25
// REPORT RequestId: 46587c57-ff3f-4a53-9772-b206f6634f25	Duration: 1173.99 ms	Billed Duration: 1200 ms	Memory Size: 128 MB	Max Memory Used: 94 MB	Init Duration: 346.74 ms	
