import { differenceInMilliseconds } from "date-fns";
import { createContext, useEffect, useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router";

export const AuthenticationContext = createContext(null);

export const AuthenticationProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [alert, setAlert] = useState({
    isError: true,
    status: false,
    message: "",
  });
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    document.title = "Smitch Ecommerce";

    const authToken = JSON.parse(localStorage.getItem("auth"));

    console.log(authToken);
    if (authToken) {
      setAuth(authToken);
    }
    console.clear();

    // setTimeout(() => {
    //   console.clear();
    // }, 5000);
  }, []);

  useEffect(() => {
    if (auth && auth.id) {
      if (auth.expiry) {
        const expiryTime = differenceInMilliseconds(
          new Date(auth.expiry),
          new Date(Date.now())
        );
        console.log(expiryTime);

        if (expiryTime < 0) {
          localStorage.removeItem("auth");
          setAuth(null);
          history.replace("/");
          return;
        }

        setTimeout(() => {
          localStorage.removeItem("auth");
          setAuth(null);
          history.replace("/");
        }, expiryTime);
      }
      console.log(location.pathname);
      if (location.pathname.includes("cart")) {
        history.replace("/cart");
        return;
      }

      history.replace("/products");
    } else {
      setTimeout(() => {
        console.log("loggedout");
        if (location.pathname.includes("register")) return;
        history.replace("/login");
      }, 2000);
    }
  }, [auth]);

  useEffect(() => {
    if (alert.status) {
      setTimeout(() => {
        setAlert((data) => ({
          ...data,
          status: false,
        }));
      }, 1500);
    }
  }, [alert]);

  const authProvider = useMemo(
    () => ({
      auth,
      setAuth,
      alert,
      setAlert,
    }),
    [auth, setAuth, alert, setAlert]
  );

  return (
    <AuthenticationContext.Provider value={authProvider}>
      {children}
    </AuthenticationContext.Provider>
  );
};
