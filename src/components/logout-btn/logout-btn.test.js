import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import { LogoutBtn } from "./logout-btn.jsx";

test(`LogoutBtn's snapshot`, () => {
  const renderer = new ShallowRenderer();

  renderer.render(<LogoutBtn logoutUser={jest.fn()} />);
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
