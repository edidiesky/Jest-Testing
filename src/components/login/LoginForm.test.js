import { fireEvent, render, screen } from "@testing-library/react";
import Login from "./Login";
jest.mock("axios", () => ({
  __esModule: true,

  default: {
    get: () => ({
      data: { id: 1, name: "Edidiong" },
    }),
  },
}));
test("password, username should be changed", () => {
  render(<Login />);
  const userNameText = "Edidiong";
  const passwordText = "12345";
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  fireEvent.change(usernameInputEl, { target: { value: userNameText } });
  fireEvent.change(passwordInputEl, { target: { value: passwordText } });
  expect(usernameInputEl.value).toBe(userNameText);
  expect(passwordInputEl.value).toBe(passwordText);
});
// button should not be disabled
test("button should not be disabled when input fields is available", () => {
  render(<Login />);
  const userNameText = "Edidiong";
  const passwordText = "12345";
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  fireEvent.change(usernameInputEl, { target: { value: userNameText } });
  fireEvent.change(passwordInputEl, { target: { value: passwordText } });
  const buttonInputEl = screen.getByRole("button");
  expect(buttonInputEl).toBeEnabled();
});

// loading should be rendered
test("button should not be disabled when input fields is available", () => {
  render(<Login />);
  const userNameText = "Edidiong";
  const passwordText = "12345";
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const buttonInputEl = screen.getByRole("button");
  fireEvent.change(usernameInputEl, { target: { value: userNameText } });
  fireEvent.change(passwordInputEl, { target: { value: passwordText } });
  fireEvent.click(buttonInputEl);

  expect(buttonInputEl).toHaveTextContent(/please wait/i);
});
// user be rendered after fetching
test("user be rendered after fetching", async () => {
  render(<Login />);
  const userNameText = "Edidiong";
  const passwordText = "12345";
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const buttonInputEl = screen.getByRole("button");
  fireEvent.change(usernameInputEl, { target: { value: userNameText } });
  fireEvent.change(passwordInputEl, { target: { value: passwordText } });
  fireEvent.click(buttonInputEl);

    const userItem = await screen.findByText("Edidiong");

    expect(userItem).toBeInTheDocument();
});
