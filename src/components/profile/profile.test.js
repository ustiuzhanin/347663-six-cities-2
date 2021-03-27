import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import { offer as mockOffer } from "../../mocks/single-offer";
import { user as mockUser } from "../../mocks/user";
import { Profile } from "./profile.jsx";

test(`Profile's Snapshot`, () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <Profile
      loadOffers={jest.fn()}
      clearBookmarks={jest.fn()}
      bookmarkOffers={[mockOffer]}
      user={mockUser}
    />
  );
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
