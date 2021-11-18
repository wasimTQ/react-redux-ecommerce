import { render, screen } from "./test-utils";
import Login from "../views/Auth/Login";
import userEvent from "@testing-library/user-event";

test("on login screen renders", () => {
  render(<Login />);
  //   screen.debug();
  userEvent.type(
    screen.getByPlaceholderText(/email/i, "wasimthoufiq21@gmail.com")
  );
  userEvent.type(screen.getByPlaceholderText(/password/i, "wasimpassword"));

  userEvent.click(screen.getByRole("button"));
});
