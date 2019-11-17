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
    const usersStr = s3Data.Body.toString();
    const usersJSON = JSON.parse(usersStr);
    console.log(`armchair_users ::: ${usersStr}`);
    
    await Promise.all(usersJSON.map(async user => {
      const {
        id, 
        uid,
        username,
        firstname, 
        lastname, 
        email, 
        phone, 
        contactType, 
        userGroup, 
        dateOfBirth, 
        isActive,
        photoPath } = user;
      
      const putParams = {
        TableName: "armchair_users",
        Item: { 
            id: id, 
            uid: uid, 
            username: username, 
            firstname: firstname, 
            lastname: lastname,  
            email: email,  
            phone: phone, 
            contactType: contactType, 
            userGroup: userGroup, 
            dateOfBirth: dateOfBirth, 
            isActive: isActive, 
            photoPath: photoPath 
        }
      };
      
      await documentClient.put(putParams).promise();
      
    }));
    
    responseBody = 'Succeeded adding armchair_users';
    statusCode = 201;
      
  } catch(err) {
      responseBody = 'Error adding armchair_users';
      statusCode = 403;
  }
  
  const response = {
    statusCode: statusCode,
    body: responseBody
  };
  
  return response;
};