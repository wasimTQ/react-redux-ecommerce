import { useContext } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { AuthenticationContext } from "../../store/context/AuthenticationProvider";

const Header = ({ cart }) => {
  const { setAuth, setAlert } = useContext(AuthenticationContext);
  const history = useHistory();
  return (
    <nav
      style={{ zIndex: 10000 }}
      className="fixed w-full left-0 px-5 py-2 top-0 bg-white border-b pb-2 mb-6 border-gray-800"
    >
      <div className="flex justify-between items-center max-w-4xl mx-auto">
        <Link to="/">
          <img src="/static/logo.png" className="h-8" />
        </Link>
        {/* <h4 className="">
        Hello, {JSON.parse(localStorage.getItem("auth")).name}
      </h4> */}

        <div className="flex gap-x-6">
          <Link to="/cart">
            <div className="relative">
              {cart.length > 0 && (
                <div className="absolute w-4 h-4 text-xs rounded-full -top-1 -right-1 bg-red-500 text-white flex justify-center items-center">
                  {cart.length}
                </div>
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
          </Link>

          <svg
            onClick={() => {
              setAuth(null);
              localStorage.removeItem("auth");
              setAlert({
                isError: true,
                status: true,
                message: "Logging out",
              });
              history.replace("/");
            }}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Header);
