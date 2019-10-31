import React from 'react';
import Home from './home.jsx';
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
            type: `Private`,
            location: [52.369553943508, 4.85309666406198]
          }
        ]}
        onCardHeaderClick={jest.fn()}
      />
  );
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
