import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import RenderMap from './map.jsx';

it(`RenderMap's snapshot`, () => {
  const renderer = new ShallowRenderer();
  renderer.render(
      <RenderMap
        cards={[
          {
            location: [52.369553943508, 4.85309666406198]
          }
        ]}
      />
  );

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
