exports.handler = (event, context, callback) => {
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('ArmchairBitcoinist Lambda Function deployed using Serverless Access Model')
    };
    callback(null, response);
};
