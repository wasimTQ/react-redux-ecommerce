// Products Reducer

import {
  CHANGE_STOCK_AVAILABILITY,
  SET_PRODUCTS,
  SET_PRODUCT_AS_FAVOURITE,
} from "../../constants";

let all_products = [];

export default (state = [], action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      all_products = action.products;
      return action.products;

    case SET_PRODUCT_AS_FAVOURITE:
      const favProduct = action.product;
      favProduct.favourite = true;
      return [favProduct, ...state.filter(({ id }) => id !== action.product.id)];

    case CHANGE_STOCK_AVAILABILITY:
      return state.map((product) => {
        if (product.id === action.product.id) {
          return action.product;
        } else {
          return product;
        }
      });
    default:
      return state;
  }
};
