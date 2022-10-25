import CreateProduct from "../types/createProduct";

export const validateCreateProduct = (body: CreateProduct): boolean => {
  const { description, title, count, price } = body;

  const countNum = parseFloat(count);
  const priceNum = parseFloat(price);

  return (
    !isNaN(countNum) &&
    !isNaN(priceNum) &&
    Number.isInteger(countNum) &&
    description.length > 0 &&
    title.length > 0
  );
};
