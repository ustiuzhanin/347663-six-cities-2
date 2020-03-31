import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {Login} from './login.jsx';

test(`Login's Snapshot`, () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Login isAuthorizationRequired={true} requestSignUp={jest.fn()} />
      </BrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
