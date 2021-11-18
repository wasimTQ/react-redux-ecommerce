import "./App.css";

import {
  AuthenticationContext,
  AuthenticationProvider,
} from "./store/context/AuthenticationProvider";
import { BrowserRouter as Router } from "react-router-dom";

import { useContext } from "react";
import Alert from "./components/Alert";
import AppRoutes from "./routers";
import { GridProvider } from "./store/context/GridProvider";

const AlertComponent = () => {
  const { alert } = useContext(AuthenticationContext);

  return (
    <div>
      {alert.status && (
        <Alert isError={alert.isError} message={alert.message} />
      )}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Providers>
        <AlertComponent />
        <AppRoutes />
      </Providers>
    </Router>
  );
}

const Providers = ({ children }) => (
  <AuthenticationProvider>
    <GridProvider>{children}</GridProvider>
  </AuthenticationProvider>
);

export default App;
