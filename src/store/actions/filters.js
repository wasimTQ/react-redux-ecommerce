import {
  SET_PAGINATION,
  SET_STOCK_AVAILABILITY,
  SORT_BY_CATEGORY,
  SORT_BY_RATING,
  SET_PRICE_RANGE,
} from "../../constants";

export const setPage = (page) => ({
  type: SET_PAGINATION,
  page,
});

export const setCategory = (category) => ({
  type: SORT_BY_CATEGORY,
  category,
});

export const setRating = (rating) => ({
  type: SORT_BY_RATING,
  rating,
});

export const setStockAvailability = (stockAvail) => ({
  type: SET_STOCK_AVAILABILITY,
  stockAvail,
});

export const setPriceRange = (min, max) => ({
  type: SET_PRICE_RANGE,
  priceMin: min,
  priceMax: max,
});
