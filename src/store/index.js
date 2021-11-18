import { createStore, combineReducers } from "redux";
import productsReducer from "./reducers/products";
import filtersReducer from "./reducers/filters";
import cartReducer from "./reducers/cart";

export default () => {
  const store = createStore(
    combineReducers({
      products: productsReducer,
      filters: filtersReducer,
      cart: cartReducer,
    })
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};
