import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { products } from "../../data";

const getProductsList: ValidatedEventAPIGatewayProxyEvent<object> = async (
  event
) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  return formatJSONResponse({
    products,
  });
};

export const main = middyfy(getProductsList);
