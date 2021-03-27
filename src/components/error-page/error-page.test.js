import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import { ErrorPage } from "./error-page.jsx";

test(`ErrorPage's snapshot`, () => {
  const renderer = new ShallowRenderer();

  renderer.render(
    <ErrorPage
      error={{
        message: "Error",
        response: {
          statusText: "Error test",
          status: 404,
        },
      }}
    />
  );
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
