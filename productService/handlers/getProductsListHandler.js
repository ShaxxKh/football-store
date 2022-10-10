import { cors } from "../constants/cors.js";
import { products } from "../data.js";

export async function getProductsList(event) {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  return {
    statusCode: 200,
    headers: { ...cors },
    body: JSON.stringify(products),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
}
