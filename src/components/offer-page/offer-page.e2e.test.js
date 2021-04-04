import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { OfferPage } from "./offer-page.jsx";
import { offer as mockOffer } from "../../mocks/single-offer";
import { user as mockUser } from "../../mocks/user";
import { offerWithHost as mockOfferWithHost } from "../../mocks/single-offer";

Enzyme.configure({ adapter: new Adapter() });

describe(`OfferPage component testing`, () => {
  it(`checks if click on btn calls openAuthPopup (authorization is not required)`, () => {
    const openAuthPopup = jest.fn();
    const offerPage = shallow(
      <OfferPage
        isAuthorizationRequired
        loadOffer={jest.fn()}
        loadCityOffers={jest.fn()}
        openAuthPopup={openAuthPopup}
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

    const bookmarkBtn = offerPage.find(`.property__bookmark-button`);

    bookmarkBtn.simulate(`click`);
    expect(openAuthPopup).toHaveBeenCalledTimes(1);
  });

  it(`checks if click on btn calls changeBookmark (authorization is not required)`, () => {
    const changeBookmark = jest.fn();
    const offerPage = shallow(
      <OfferPage
        isAuthorizationRequired={false}
        loadOffer={jest.fn()}
        loadCityOffers={jest.fn()}
        openAuthPopup={jest.fn()}
        popupModal={jest.fn()}
        changeBookmark={changeBookmark}
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

    const bookmarkBtn = offerPage.find(`.property__bookmark-button`);

    bookmarkBtn.simulate(`click`);
    expect(changeBookmark).toHaveBeenCalledTimes(1);
    expect(changeBookmark).toHaveBeenCalledWith(mockOfferWithHost._id);
  });
});
