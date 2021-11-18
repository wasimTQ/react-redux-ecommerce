import axios from "axios";
import { useContext, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import Layout from "../components/Layout";
import Pagination from "../components/products/Pagination";
import Product from "../components/products/Product";
import { BACKEND_URL } from "../constants";
import { setAllProducts } from "../store/actions/products";
import productSelector from "../store/selectors/products";
import _ from "lodash";
import { addToCart } from "../store/actions/cart";
import Filters from "../components/products/Filters";
import { GridContext } from "../store/context/GridProvider";
import { Shimmer } from "react-shimmer";

const Products = ({ products, pages, currentPage }) => {
  const dispatch = useDispatch();
  const { grid } = useContext(GridContext);

  useEffect(async () => {
    if (!products) {
      try {
        const res = await axios.get(BACKEND_URL + "products");
        const products = res.data.map((product) => ({
          ...product,
          favourite: false,
          quantity: 0,
        }));

        const cartProducts = JSON.parse(localStorage.getItem("cart"));

        if (cartProducts) {
          localStorage.removeItem("cart");
          cartProducts.forEach((item) => {
            const index = _.findIndex(products, { id: item.id });
            products[index] = item;
            dispatch(addToCart(item));
          });
        }
        dispatch(setAllProducts(products));
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return (
    <Layout>
      <Filters />

      {products ? (
        <>
          <div className={`grid grid-cols-${grid} gap-4 mb-6`}>
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>

          <Pagination length={pages} currentPage={currentPage} />
        </>
      ) : (
        <div className={`grid grid-cols-${grid} gap-4 mb-6`}>
          {Array.from(new Array(10)).map((_, index) => (
            <Shimmer width={600} height={400} key={index} />
          ))}
        </div>
      )}
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return productSelector(state.products, state.filters);
};

export default connect(mapStateToProps)(Products);
