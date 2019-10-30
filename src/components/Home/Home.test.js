import React from 'react';
import Home from './Home.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';

test(`Home's snapshot`, () => {
  const renderer = new ShallowRenderer();
  renderer.render(
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
  );
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
