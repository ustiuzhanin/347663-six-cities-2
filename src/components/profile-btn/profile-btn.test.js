import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import { ProfileBtn } from "./profile-btn.jsx";

test(`ProfileBtn's Snapshot`, () => {
  const renderer = new ShallowRenderer();
  renderer.render(<ProfileBtn url="test.com" title="test" />);

  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
