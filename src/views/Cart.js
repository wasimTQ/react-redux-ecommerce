import { connect, useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { addToCart } from "../store/actions/cart";
import { changeStock } from "../store/actions/products";
import { cartTotal } from "../store/selectors/cart";

const Cart = ({ cart, cartTotal }) => {
  const dispatch = useDispatch();
  const changeQuantity = (item, action) => {
    if (action === "INCREASE") {
      item.quantity += 1;
      item.stock_availiblity -= 1;
    } else {
      item.stock_availiblity += 1;
      item.quantity -= 1;
    }
    dispatch(addToCart(item));

    dispatch(changeStock(item));
  };

  return (
    <Layout>
      <div style={{zIndex:100000}} className="fixed bottom-2 w-full left-0 flex justify-center">
        <button className="bg-gray-800 text-white px-6 py-2 rounded-xl">Checkout for &#8377; {cartTotal}</button>
      </div>
      <div className="mb-12">
        {cart.map((item) => (
          <div
            key={item.id}
            className="px-5 py-2 mb-6 relative rounded-xl bg-white shadow-md flex gap-x-3"
          >
            <div className="absolute top-0 left-0 rounded-lg px-3 py-1 bg-green-500 text-white">
              &#8377; {item.price * item.quantity}
            </div>
            <img src={item.image_url} className="w-1/3 object-cover rounded-xl" />
            <div>
              <div className="flex items-center gap-x-3">
                <h3 className="capitalize text-xl">{item.name}</h3>
                <h5 className="text-red-500">
                  {" "}
                  {item.stock_availiblity > 0
                    ? item.stock_availiblity + " in stock"
                    : "Out of stock"}
                </h5>
              </div>
              <p className="font-extralight opacity-70 text-xs">
                {item.description.substring(0, 200)}
              </p>

              <div className="flex gap-x-3 items-center">
                <svg
                  onClick={() => changeQuantity(item, "DECREASE")}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 12H6"
                  />
                </svg>
                <div className="bg-gray-100 w-10 h-10 flex justify-center items-center rounded-lg">
                  {item.quantity}
                </div>
                <svg
                  onClick={() => changeQuantity(item, "INCREASE")}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    cartTotal: cartTotal(state.cart),
  };
};

export default connect(mapStateToProps)(Cart);
