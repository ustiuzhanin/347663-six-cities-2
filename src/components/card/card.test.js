import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";

import { Card } from "./card.jsx";
import { user as mockUser } from "../../mocks/user";
import { offer as mockOffer } from "../../mocks/single-offer";

test(`Card's snapshot`, () => {
  const tree = renderer.create(
    <BrowserRouter>
      <Card
        isAuthorizationRequired={false}
        changeBookmark={jest.fn()}
        changeActiveCard={jest.fn()}
        openAuthPopup={jest.fn()}
        card={mockOffer}
        user={mockUser}
      />
    </BrowserRouter>
  );

  expect(tree).toMatchSnapshot();
});
