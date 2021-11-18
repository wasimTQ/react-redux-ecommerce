import { useEffect } from "react";
import { useHistory, useLocation } from "react-router";

const ErrorPage = () => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      history.replace("/");
    }, 1500);
  });

  return (
    <div className="h-screen flex-center mx-16 text-center">
      <div>
        <h1 className="text-4xl">
          The page{" "}
          <span className="text-4xl text-accent">({location.pathname})</span> is
          not available right now. Please check the url twice before proceeding.
        </h1>
        <h5 className="text-2xl mt-6 text-accent">
          You are redirecting to home
        </h5>
      </div>
    </div>
  );
};

export default ErrorPage;
