import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import { offer as mockOffer } from "../../mocks/single-offer";
import { RenderMap } from "./map.jsx";

it(`RenderMap's snapshot`, () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <RenderMap
      renderCircle
      addOffersInRadius={jest.fn()}
      resetOffersInRadius={jest.fn()}
      currentOffer={mockOffer}
      activeCard={mockOffer}
      offers={[mockOffer]}
    />
  );

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
