"use strict";
const data = require("./data.json");

module.exports.getProductsList = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
