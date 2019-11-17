const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    let statusCode = 0;
    let responseBody = '';

    const { name } = event.Records[0].s3.bucket;
    const { key } = event.Records[0].s3.object;

    const getObjectParams = {
        Bucket: name,
        Key: key
    };

    try {
        const s3Data = await s3.getObject(getObjectParams).promise();
        const btcStr = s3Data.Body.toString();
        const btcJSON = JSON.parse(btcStr);
        console.log(`prices_bitcoin ::: ${btcStr}`);

        await Promise.all(btcJSON.map(async btc => {
            const { 
                Date,
                Close,
                High,
                Low,
                Open,
                Symbol,
               //// VolumeBTC,
               // VolumeUSD 
               } = btc

            const putParams = {
                TableName: "prices_bitcoin",
                Item: {
                    Date: Date,
                    Close: Close,
                    High: High,
                    Low: Low,
                    Open: Open,
                    Symbol: Symbol
                   // VolumeBTC: VolumeBTC,
                   // VolumeUSD: VolumeUSD
                }
            };

            await documentClient.put(putParams).promise();

        }));

        responseBody = 'Succeeded adding prices_bitcoin';
        statusCode = 201;

    } catch (err) {
        responseBody = 'Error adding prices_bitcoin';
        statusCode = 403;
    }

    const response = {
        statusCode: statusCode,
        body: responseBody
    };

    return response;
};