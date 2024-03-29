import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import { Home } from "./home.jsx";

test(`Home's snapshot`, () => {
  const renderer = new ShallowRenderer();

  renderer.render(<Home popupModal={false} />);
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
