import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import { Header } from "./header.jsx";

test(`Header's Snapshot`, () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <Header
      isAuthorizationRequired
      user={{
        email: "test@test.test",
        token: "123token",
        userId: "1234124",
      }}
    />
  );
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
