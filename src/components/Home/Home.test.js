import React from 'react';
import Home from './Home.jsx';
import renderer from 'react-test-renderer';

test(`Home's snapshot`, () => {
  const tree = renderer
    .create(
        <Home
          places={[
            {
              id: 1,
              src: `img`,
              price: `10`,
              rating: `10`,
              name: `Beautiful`,
              type: `Private`
            }
          ]}
          onCardHeaderClick={jest.fn()}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
