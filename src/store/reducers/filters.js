// Filters Reducer

import {
  RESET_FILTERS,
  SET_PAGINATION,
  SET_PRICE_RANGE,
  SET_STOCK_AVAILABILITY,
  SET_TEXT_FILTER,
  SORT_BY_CATEGORY,
  SORT_BY_RATING,
} from "../../constants";

const filtersReducerDefaultState = {
  text: "",
  category: "all",
  rating: 1,
  stockAvail: 1,
  page: 0,
  priceMin: 200,
  priceMax: 1000000,
};

export default (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case SET_TEXT_FILTER:
      return {
        ...state,
        text: action.text,
      };
    case SORT_BY_CATEGORY:
      return {
        ...state,
        category: action.category,
      };
    case SORT_BY_RATING:
      return {
        ...state,
        rating: action.rating,
      };
    case SET_PAGINATION:
      return {
        ...state,
        page: action.page,
      };
    case SET_STOCK_AVAILABILITY:
      return {
        ...state,
        stockAvail: action.stockAvail,
      };

    case SET_PRICE_RANGE:
      return {
        ...state,
        priceMin: action.priceMin,
        priceMax: action.priceMax,
      };

    case RESET_FILTERS:
      return filtersReducerDefaultState;
    default:
      return state;
  }
};
