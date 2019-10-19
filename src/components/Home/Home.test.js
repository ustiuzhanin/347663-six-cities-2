import React from 'react';
import Home from './Home.jsx';
import renderer from 'react-test-renderer';

test(`Home's snapshot`, () => {
  const tree = renderer
    .create(<Home places={[`house`, `floor`]} onCardHeaderClick={jest.fn()} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
