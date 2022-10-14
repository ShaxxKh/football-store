import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { products } from "../../data";
import schema from "./schema";

const getProductsById: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const { pathParameters } = event;
  const productId = Number(pathParameters.id);

  if (!productId) {
    return formatJSONResponse(
      {
        message: "Product id was not provided or of a wrong type",
      },
      400
    );
  }

  const product = await products.find((product) => product.id === productId);

  if (!product) {
    return formatJSONResponse(
      {
        message: "Product Not Found",
      },
      404
    );
  }

  return formatJSONResponse({
    product,
  });
};

export const main = middyfy(getProductsById);
