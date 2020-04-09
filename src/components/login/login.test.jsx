import React from 'react';
import {Login} from './login.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';

test(`Login's Snapshot`, () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <Login isAuthorizationRequired={true} requestSignUp={jest.fn()} />
  );
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});