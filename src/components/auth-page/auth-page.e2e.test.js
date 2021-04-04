import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { AuthPage } from "./auth-page.jsx";

Enzyme.configure({ adapter: new Adapter() });

describe(`AuthPage component testing`, () => {
  it(`checks if form submit calls requestLogin`, () => {
    const requestLogin = jest.fn();
    const authPage = shallow(
      <AuthPage
        requestSignUp={jest.fn()}
        requestLogin={requestLogin}
        isAuthorizationRequired
        method="Login"
      />
    );

    const form = authPage.find(`.login__form`);

    form.simulate(`submit`, { preventDefault: () => {} });
    expect(requestLogin).toHaveBeenCalledTimes(1);
  });

  it(`checks if form submit calls requestSignUp`, () => {
    const requestSignUp = jest.fn();
    const authPage = shallow(
      <AuthPage
        requestSignUp={requestSignUp}
        requestLogin={jest.fn()}
        isAuthorizationRequired
        method="Sign up"
      />
    );

    const form = authPage.find(`.login__form`);

    form.simulate(`submit`, { preventDefault: () => {} });
    expect(requestSignUp).toHaveBeenCalledTimes(1);
  });
});
