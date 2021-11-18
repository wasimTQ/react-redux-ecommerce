import _ from "lodash";

// Get products by filters and pagination

export default (
  products,
  { text, category, rating, page, stockAvail, priceMin, priceMax }
) => {
  if (category !== "all") {
    console.log(category);
    products = products.filter((product) => product.category === category);
  }
  products = products.filter(
    (product) =>
      product.rating >= rating &&
      product.stock_availiblity >= stockAvail &&
      product.price >= priceMin &&
      product.price <= priceMax
  );
  const chunkedProducts = _.chunk(products, [10]);
  return {
    products: chunkedProducts[page],
    pages: chunkedProducts.length,
    currentPage: page,
  };
};
