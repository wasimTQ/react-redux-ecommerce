import _ from "lodash";

export const cartTotal = (cart) => {
  return _.sumBy(cart, (item) => item.quantity * item.price);
};
