import React from "react";
import { App } from "./app.jsx";
import ShallowRenderer from "react-test-renderer/shallow";

test(`App's snapshot`, () => {
  const renderer = new ShallowRenderer();

  renderer.render(
    <App
      autoAuth={jest.fn()}
      getUser={jest.fn()}
      isAuthorizationRequired
      errorMessage={{}}
      user={{
        token: "123321",
        userId: "1",
        email: "test@test.test",
        bookmarks: [],
      }}
    />
  );

  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
