import { useContext, useEffect, useState } from "react";
import { Route, Redirect, useLocation, useHistory } from "react-router-dom";
import { AuthenticationContext } from "../store/context/AuthenticationProvider";

export const ProtectedRoute = ({
  type,
  path,
  component: Component,
  ...rest
}) => {
  const [redirection, setRedirection] = useState("/products");
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    // history.replace(localStorage.getItem("redirect-to") ?? redirection);
    return () => {
      if (
        location.pathname.includes("cart") ||
        location.pathname.includes("/products")
      ) {
        console.log(location.pathname);
        // localStorage.setItem("redirect-to", location.pathname);
        // setRedirection(location.pathname);
        // console.log(redirection);
      }
    };
  }, []);
  // const { auth } = useContext(AuthenticationContext);
  // console.log(auth);
  const auth = JSON.parse(localStorage.getItem("auth"));

  if (type === "auth") {
    return (
      <Route
        path={path}
        render={(props) =>
          !auth ? (
            Component
          ) : (
            <Redirect
              to={{
                pathname: redirection,
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        auth && auth.id ? (
          Component
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
  );
};
