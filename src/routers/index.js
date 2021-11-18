import { Route, Redirect, Switch } from "react-router-dom";

import { ProtectedRoute } from "../helpers";
import PrivateRoute from "../helpers/PrivateRoute";

import ErrorPage from "../views/404";
import Login from "../views/Auth/Login";
import Register from "../views/Auth/Register";
import Cart from "../views/Cart";
import Products from "../views/Products";
import SingleProduct from "../views/SingleProduct";

const AppRoutes = ({ children }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <Switch>
        {/* Authentication */}
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <ProtectedRoute type="auth" path="/login" component={<Login />} />
        <ProtectedRoute type="auth" path="/register" component={<Register />} />

        <Route exact path="/products">
          <ProtectedRoute component={<Products />} />
        </Route>
        <Route exact path="/cart">
          <ProtectedRoute path="/cart" component={<Cart />} />
        </Route>
        {/* <PrivateRoute path="/products/*" element={<SingleProduct />} /> */}

        <Route path="/products/*">
          <ProtectedRoute component={<SingleProduct />} />
        </Route>

        {/* 404 Error page */}
        <Route component={ErrorPage} />
      </Switch>
    </div>
  );
};

export default AppRoutes;
