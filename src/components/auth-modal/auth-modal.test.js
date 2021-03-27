import React from "react";
import { AuthModal } from "./auth-modal.jsx";
import ShallowRenderer from "react-test-renderer/shallow";

test(`AuthModal's snapshot`, () => {
  const renderer = new ShallowRenderer();

  renderer.render(<AuthModal closePopup={jest.fn()} />);

  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
