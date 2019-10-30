import React from 'react';
import App from './App.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';

test(`App's snapshot`, () => {
  const renderer = new ShallowRenderer();
  renderer.render(
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
  );
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
