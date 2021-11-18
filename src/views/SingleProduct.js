import _ from "lodash";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import Layout from "../components/Layout";
import Rating from "../components/products/Rating";

const SingleProduct = ({ products }) => {
  const location = useLocation();
  const [product, setProduct] = useState({});
  useEffect(() => {
    setProduct(
      _.find(products, { id: location.pathname.replace("/products/", "") })
    );
  });

  return (
    <Layout>
      <img src={product.image_url} className="rounded-xl h-80 mx-auto" />
      <div className="flex justify-between items-center">
        <div>
          <div className="sm:flex items-center mt-6 gap-x-6">
            <h5 className="bg-red-500 order-2 px-4 py-1 rounded-full text-white">
              {product.stock_availiblity > 0
                ? product.stock_availiblity + " in stock"
                : "Out of stock"}
            </h5>
            <h3 className="uppercase text-xl">{product.name}</h3>
          </div>
          <Rating rating={product.rating} />
        </div>
        <div className="flex flex-col items-center">
          <h4 className="text-red-500 text-xl">&#8377; {product.price}</h4>
          {product.price > product.old_price && (
            <h4 className="line-through opacity-70 text-sm">
              &#8377; {product.old_price}
            </h4>
          )}
        </div>
      </div>
      <p className="opacity-80 mt-4">{product.description}</p>
    </Layout>
  );
};

const mapStateToProps = (state, props) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(SingleProduct);
