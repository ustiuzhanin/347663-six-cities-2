import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import RenderMap from './map.jsx';

it(`RenderMap's snapshot`, () => {
  const renderer = new ShallowRenderer();
  renderer.render(
      <RenderMap
        activeCity={{
          coords: [52.38333, 4.9],
          offers: [{location: [52.369553943508, 4.85309666406198]}]
        }}
      />
  );

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
