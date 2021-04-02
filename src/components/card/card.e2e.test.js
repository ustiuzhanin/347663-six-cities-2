import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Card } from "./card.jsx";
import { offer as mockCard } from "../../mocks/single-offer";
import { user as mockUser } from "../../mocks/user";

Enzyme.configure({ adapter: new Adapter() });

describe(`Card component testing`, () => {
  it(`check the information that gets passed to the changeActiveCard`, () => {
    const changeActiveCard = jest.fn();
    const card = shallow(
      <Card
        isAuthorizationRequired
        card={mockCard}
        user={mockUser}
        changeActiveCard={changeActiveCard}
        changeBookmark={jest.fn()}
        openAuthPopup={jest.fn()}
      />
    );

    const activeCard = card.find(`.place-card`);

    activeCard.simulate(`mouseEnter`);
    expect(changeActiveCard).toHaveBeenCalledTimes(1);
    expect(changeActiveCard).toHaveBeenCalledWith(mockCard);

    activeCard.simulate(`mouseLeave`);
    expect(changeActiveCard).toHaveBeenCalledTimes(2);
    expect(changeActiveCard).toHaveBeenCalledWith({});
  });

  it(`opens auth popup`, () => {
    const openAuthPopup = jest.fn();

    const card = shallow(
      <Card
        isAuthorizationRequired
        card={mockCard}
        user={mockUser}
        changeActiveCard={jest.fn()}
        changeBookmark={jest.fn()}
        openAuthPopup={openAuthPopup}
      />
    );

    const bookmark = card.find(`.place-card__bookmark-button`);
    bookmark.simulate(`click`);
    expect(openAuthPopup).toHaveBeenCalledTimes(1);
  });

  it(`adds a bookmark when`, () => {
    const changeBookmark = jest.fn();

    const card = shallow(
      <Card
        isAuthorizationRequired={false}
        card={mockCard}
        user={mockUser}
        changeActiveCard={jest.fn()}
        changeBookmark={changeBookmark}
        openAuthPopup={jest.fn()}
      />
    );

    const bookmark = card.find(`.place-card__bookmark-button`);
    bookmark.simulate(`click`);
    expect(changeBookmark).toHaveBeenCalledTimes(1);
    expect(changeBookmark).toHaveBeenCalledWith(mockCard._id);
  });
});
