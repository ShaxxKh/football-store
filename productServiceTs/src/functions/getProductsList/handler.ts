import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { APIGatewayProxyEvent } from "aws-lambda";
import { db } from "src/db";
import Product from "src/types/product";

const getProductsList = async (event: APIGatewayProxyEvent) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const client = await db();
  const query = `SELECT p.*, s.count FROM products p JOIN stocks s ON p.id = s.product_id`;
  const result = await client.query<Product>(query);
  const products = result.rows;
  await client.end();

  return formatJSONResponse(products);
};

export const main = middyfy(getProductsList);
