import React from 'react';
import App from './app.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';

test(`App's snapshot`, () => {
  const renderer = new ShallowRenderer();
  renderer.render(
      <App
        offers={[
          {
            coords: [52.38333, 4.9],
            offers: [
              {
                id: 1,
                src: `img/room.jpg`,
                price: `80`,
                rating: `70`,
                name: `Beautiful & luxurious apartment at great location`,
                type: `Private room`,
                location: [52.3909553943508, 4.85309666406198]
              }
            ]
          }
        ]}
      />
  );
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
