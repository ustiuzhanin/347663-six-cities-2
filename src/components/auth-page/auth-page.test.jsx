import React from "react";
import { AuthPage } from "./auth-page.jsx";
import ShallowRenderer from "react-test-renderer/shallow";

test(`AuthPage's Snapshot`, () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <AuthPage
      requestSignUp={jest.fn()}
      requestLogin={jest.fn()}
      isAuthorizationRequired
      method="login"
    />
  );
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
