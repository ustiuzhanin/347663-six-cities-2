import React from 'react';
import App from './App.jsx';
import renderer from 'react-test-renderer';

test(`App's snapshot`, () => {
  const tree = renderer.create(<App />).toJSON();

  expect(tree).toMatchSnapshot();
});
