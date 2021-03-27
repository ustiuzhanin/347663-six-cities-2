import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import { CardList } from "./card-list.jsx";

import { offer as MockOffer } from "../../mocks/single-offer";

test(`CardList's snapshot`, () => {
  const renderer = new ShallowRenderer();

  renderer.render(
    <CardList
      activeCity={`Amsterdam`}
      changeSortingType={jest.fn()}
      loadCityOffers={jest.fn()}
      sorting={{ type: "popular", text: "Popular" }}
      cityOffers={[MockOffer]}
    />
  );

  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
