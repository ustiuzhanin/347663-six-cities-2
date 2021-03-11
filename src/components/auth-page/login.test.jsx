import React from "react";
import { AuthPage } from "./signup.jsx.js.js";
import ShallowRenderer from "react-test-renderer/shallow";

test(`AuthPage's Snapshot`, () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <AuthPage isAuthorizationRequired={true} requestSignUp={jest.fn()} />
  );
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
