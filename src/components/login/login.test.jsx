import React from 'react';
import renderer from 'react-test-renderer';
import Login from './login.jsx';

test(`Login's Snapshot`, () => {
  const tree = renderer.create(<Login />).toJSON();

  expect(tree).toMatchSnapshot();
});
