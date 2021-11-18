import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../store/actions/cart";
import {
  changeStock,
  setProductAsFavourite,
} from "../../store/actions/products";
import Rating from "./Rating";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="bg-white select-none shadow-md rounded-xl p-3 relative">
      <div
        onClick={() => {
          console.log(product);
          dispatch(setProductAsFavourite(product));
        }}
        className={`absolute cursor-pointer top-5 right-5 rounded-lg p-1 text-gray-100 
      ${product.favourite ? "bg-red-500" : "bg-gray-500"}
      `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <img
        className="rounded-xl h-28 w-full object-cover"
        src={product.image_url}
      />

      <div className="flex justify-between mt-2 items-center ">
        <div className="flex flex-col justify-between">
          <h4 className="capitalize text-xl text-gray-900">{product.name}</h4>

          <h5 className="text-red-500">
            {product.stock_availiblity > 0
              ? product.stock_availiblity + " in stock"
              : "Out of stock"}
          </h5>
        </div>
        <div className="flex flex-col items-end justify-between">
          <h5 className="text-gray-700"> &#8377; {product.price}</h5>

          <Rating rating={product.rating} />
        </div>
      </div>

      {product.stock_availiblity > 0 && (
        <div className="flex gap-x-2 justify-center mt-4 items-center">
          <svg
            onClick={() =>
              setQuantity((quantity) =>
                quantity > 1 ? quantity - 1 : quantity
              )
            }
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
          <button
            onClick={() => {
              product.stock_availiblity -= quantity;
              product.quantity += quantity;

              dispatch(addToCart(product));
              dispatch(changeStock(product));

              setQuantity(1);
            }}
            className="uppercase text-white cursor-pointer bg-blue-400 px-5 py-2 rounded-lg text-sm"
          >
            Add {quantity} product
          </button>
          <svg
            onClick={() =>
              setQuantity((quantity) =>
                quantity < product.stock_availiblity ? quantity + 1 : quantity
              )
            }
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
      )}

      <Link
        to={`/products/${product.id}`}
        className="flex justify-center mt-2"
      >
        View
      </Link>
    </div>
  );
};

export default Product;
