import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { APIGatewayProxyEvent } from "aws-lambda";
import { db } from "src/db";
import CreateProduct from "src/types/createProduct";
import { validateCreateProduct } from "src/utils/validateCreateProduct";

const createProduct = async (event: APIGatewayProxyEvent) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const body = event.body as unknown as CreateProduct;
  if (!validateCreateProduct(body)) {
    return formatJSONResponse(
      {
        message: "Invalid data provided",
      },
      400
    );
  }

  const { title, description, price, count } = body;

  const client = await db();

  try {
    await client.query("BEGIN");
    const productQuery = `INSERT INTO 
      products(title, description, price) 
      VALUES ($1, $2, $3)
      RETURNING id`;

    const result = await client.query(productQuery, [
      title,
      description,
      price,
    ]);
    const productId = result.rows[0].id;

    const stockQuery = `INSERT INTO 
      stocks(product_id, count) 
      VALUES ($1, $2)`;
    await client.query(stockQuery, [productId, count]);
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    await client.end();

    return formatJSONResponse(
      {
        message: `Unexpected error: ${JSON.stringify(error)}`,
      },
      500
    );
  }

  await client.end();
  return formatJSONResponse(
    {
      message: "Product created successfully",
    },
    201
  );
};

export const main = middyfy(createProduct);
