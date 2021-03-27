import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import { offer as mockOffer } from "../../mocks/single-offer";
import { offerWithHost as mockOfferWithHost } from "../../mocks/single-offer";
import { user as mockUser } from "../../mocks/user";
import { OfferPage } from "./offer-page.jsx";

test(`OfferPage's Snapshot`, () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <OfferPage
      isAuthorizationRequired
      loadOffer={jest.fn()}
      loadCityOffers={jest.fn()}
      openAuthPopup={jest.fn()}
      popupModal={jest.fn()}
      changeBookmark={jest.fn()}
      offersInRadius={[mockOffer]}
      card={mockOfferWithHost}
      user={mockUser}
      match={{
        params: {
          id: "id12",
        },
      }}
    />
  );
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
