import { useContext } from "react";
import { Redirect, Route } from "react-router";

import { AuthenticationContext } from "../store/context/AuthenticationProvider";

function PrivateRoute({ element, path }) {
  const { auth } = useContext(AuthenticationContext);
  const ele = auth ? element : <Redirect to="/login" replace />;

  return <Route path={path} element={ele} />;
}

export default PrivateRoute;
