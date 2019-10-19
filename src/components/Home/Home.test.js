import React from 'react';
import Home from './Home.jsx';
import renderer from 'react-test-renderer';

test(`Home's snapshot`, () => {
  const tree = renderer.create(<Home places={[`house`, `floor`]} />).toJSON();

  expect(tree).toMatchSnapshot();
});
