import {
  CHANGE_STOCK_AVAILABILITY,
  SET_PRODUCTS,
  SET_PRODUCT_AS_FAVOURITE,
} from "../../constants";

export const setAllProducts = (products) => ({
  type: SET_PRODUCTS,
  products,
});

export const setProductAsFavourite = (product) => ({
  type: SET_PRODUCT_AS_FAVOURITE,
  product,
});

export const changeStock = (product) => ({
  type: CHANGE_STOCK_AVAILABILITY,
  product,
});
