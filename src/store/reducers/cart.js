// Products Reducer
import _ from "lodash";
import { ADD_TO_CART } from "../../constants";

export default (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      var index = _.findIndex(state, { id: action.product.id });
      let cartProducts;
      if (index < 0) {
        cartProducts = [...state, action.product];
      } else {
        cartProducts = state.map((product) =>
          product.id === action.product.id ? action.product : product
        );
      }

      console.log(cartProducts);

      localStorage.setItem("cart", JSON.stringify(cartProducts));
      return cartProducts;

    default:
      return state;
  }
};
