import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { LogoutBtn } from "./logout-btn.jsx";

Enzyme.configure({ adapter: new Adapter() });

describe(`LogoutBtn component testing`, () => {
  it(`checks if click on btn calls logoutUser`, () => {
    const logoutUser = jest.fn();
    const logoutBtn = shallow(<LogoutBtn logoutUser={logoutUser} />);

    const btn = logoutBtn.find(`.header__nav-link--btn`);

    btn.simulate(`click`);
    expect(logoutUser).toHaveBeenCalledTimes(1);
  });
});
