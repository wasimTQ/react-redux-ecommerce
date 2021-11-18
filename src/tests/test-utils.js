import React from "react";
import { render } from "@testing-library/react";
import { AuthenticationProvider } from "../store/context/AuthenticationProvider";
import { GridProvider } from "../store/context/GridProvider";
import { BrowserRouter } from "react-router-dom";

const AllTheProviders = ({ children }) => {
  return (
    <BrowserRouter>
      <AuthenticationProvider>
        <GridProvider>{children}</GridProvider>
      </AuthenticationProvider>
    </BrowserRouter>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
