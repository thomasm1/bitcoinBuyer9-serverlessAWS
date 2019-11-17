'use strict';
const AWS = require('aws-sdk');
AWS.config.update({ region: "us-east-1"});


const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });


function response(statusCode, body) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(body)
  };
}

exports.handler = async (event, context, callback) => {
  // let responseBody = "";
  // let statusCode = 0;

  const id = event.pathParameters.id;  //   "1"
  const reqBody = JSON.parse(event.body);
  const {   uid, username, firstname, lastname, email, phone, contactType, userGroup, dateOfBirth, isActive, photoPath } = reqBody; 
  // const { id, uid, username, firstname, lastname, email, phone, userGroup, dateOfBirth, isActive, photoPath } = JSON.stringify(event.body);

  const params = {
    TableName: "armchair_users",
    Key: {
      id:  id
    }, 
    ConditionExpression: 'attribute_exists(id)',
    UpdateExpression: "SET uid = :u, username = :s,  firstname = :f, lastname = :l, email = :e, phone = :p, contactType = :c, userGroup = :g, dateOfBirth = :b, isActive = :a, photoPath = :h",

    ExpressionAttributeValues: {
      ":s":  username, 
      ":u":  uid,  // ":u": { "S": uid }, 
      ":f":  firstname,
      ":l":  lastname,
      ":e":  email,
      ":p":  phone, // ":p": { "N": phone },
      ":c":  contactType,
      ":g":  userGroup,
      ":b":  dateOfBirth,
      ":a":  isActive,
      ":h":  photoPath  
    },
    ReturnValues: "UPDATED_NEW"
  };
  console.log('Update');

  return documentClient
    .update(params)
    .promise()
    .then((res) => {
      console.log(res);
      callback(null, response(201, res.Attributes));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
  // try {
  //   const data = await documentClient
  //     .update(params)
  //     .promise();
  //   responseBody = JSON.stringify(data);
  //   statusCode = 204;
  // } catch(err) {
  //   responseBody = `Unable to update user: ${err}`;
  //   statusCode = 403;
  // }

  // const response = {
  //   statusCode: statusCode,
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: responseBody
  // };

  // return response;
};
