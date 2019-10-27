import React from 'react';
import App from './App.jsx';
import renderer from 'react-test-renderer';

test(`App's snapshot`, () => {
  const tree = renderer
    .create(
        <App
          offers={[
            {
              id: 1,
              src: `img`,
              price: `10`,
              rating: `10`,
              name: `Beautiful`,
              type: `Private`
            }
          ]}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
