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
        const ethStr = s3Data.Body.toString();
        const ethJSON = JSON.parse(ethStr);
        // console.log(`prices_bitcoin ::: ${ethStr}`);

        await Promise.all(ethJSON.map(async eth => {
            const { 
                id,
                date,
                close,
                high,
                low,
                open,
                symbol,
                  netPositive,
                  tracking
               //// VolumeETH,
               // VolumeUSD 
               } = eth

            const putParams = {
                TableName: "prices_ethereum2",
                Item: {
                    id: id,
                    date:date ,
                    close:close ,
                    high:high ,
                    low: low,
                    open: open,
                    symbol:symbol,
                      netPositive:netPositive,
                      tracking:tracking
                   // VolumeETH: VolumeETH,
                   // VolumeUSD: VolumeUSD
                }
            };

            await documentClient.put(putParams).promise();

        }));

        responseBody = 'Succeeded adding prices_ethereum2';
        statusCode = 201;

    } catch (err) {
        responseBody = 'Error adding prices_ethereum2';
        statusCode = 403;
    }

    const response = {
        statusCode: statusCode,
        body: responseBody
    };

    return response;
};