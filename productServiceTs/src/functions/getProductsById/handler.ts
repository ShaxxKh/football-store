import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { db } from "src/db";
import checkUUID from "src/utils/checkUUID";
import Product from "src/types/product";
import { APIGatewayProxyEvent } from "aws-lambda";

const getProductsById = async (event: APIGatewayProxyEvent) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const { pathParameters } = event;
  const productId = pathParameters.id;

  if (!productId || !checkUUID(productId)) {
    return formatJSONResponse(
      {
        message: "Product id was not provided or of a wrong type",
      },
      400
    );
  }

  const client = await db();

  const findOneQuery = `SELECT p.*, s.count
  FROM products p
  JOIN stocks s
  ON p.id = s.product_id
  WHERE id = $1`;

  const result = await client.query<Product>(findOneQuery, [productId]);
  const product = result.rows[0];

  await client.end();

  console.log(`PRODUCT: ${product}`);
  console.log(`PRODUCT: ${JSON.stringify(product)}`);

  if (!product) {
    return formatJSONResponse(
      {
        message: "Product Not Found",
      },
      404
    );
  }

  return formatJSONResponse(product);
};

export const main = middyfy(getProductsById);
