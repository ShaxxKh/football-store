import { products } from "../data.js";
import { cors } from "../constants/cors.js";

export async function getProductsById(event) {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const { pathParameters } = event;
  const productId = Number(pathParameters.id);

  if (!productId) {
    return {
      statusCode: 400,
      headers: { ...cors },
      body: JSON.stringify({
        message: "Product id was not provided or of a wrong type",
      }),
    };
  }

  const product = await products.find((product) => product.id === productId);

  if (!product) {
    return {
      statusCode: 404,
      headers: { ...cors },
      body: JSON.stringify({
        message: "Product Not Found",
      }),
    };
  }

  return {
    statusCode: 200,
    headers: { ...cors },
    body: JSON.stringify(product),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
}
