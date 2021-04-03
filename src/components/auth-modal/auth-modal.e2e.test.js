import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { AuthModal } from "./auth-modal.jsx";

Enzyme.configure({ adapter: new Adapter() });

describe(`AuthModal component testing`, () => {
  it(`check if click on the btn closes the popup`, () => {
    const closePopup = jest.fn();
    const authModal = shallow(<AuthModal closePopup={closePopup} />);

    const btnClose = authModal.find(`.auth-popup__btn--close`);

    btnClose.simulate(`click`);
    expect(closePopup).toHaveBeenCalledTimes(1);
    expect(closePopup).toHaveBeenCalledWith();
  });
});
