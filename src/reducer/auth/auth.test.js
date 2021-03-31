import MockAdapter from "axios-mock-adapter";

import { reducer, ActionCreator, ActionType, Operations } from "./auth";
import { testApi as api } from "../../api";

describe(`operations work correctly`, () => {
  const apiMock = new MockAdapter(api);

  it("Should make a post request to /auth/signup, if if succeeds send a requset to /auth/login to login the user", async () => {
    const dispatch = jest.fn();
    const loginPost = Operations.requestSignUp("email", "password", "name");

    apiMock
      .onPost("/auth/signup", {
        email: "email",
        password: "password",
        name: "name",
      })
      .reply(201, [{ fakeUser: true }]);

    apiMock.onPost("/auth/login").reply(200, [{ fakeUser: true }]);

    return loginPost(dispatch, null, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(3);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.REQUEST_SIGNUP,
        payload: [{ fakeUser: true }],
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.REQUEST_LOGIN,
        payload: [{ fakeUser: true }],
      });
      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: ActionType.REQUIRED_AUTHORIZATION,
        payload: false,
      });
    });
  });

  it("Should make a post request to /auth/login", async () => {
    const dispatch = jest.fn();
    const signUpPost = Operations.requestLogin("email", "password");

    apiMock
      .onPost("/auth/login", {
        email: "email",
        password: "password",
      })
      .reply(200, [{ fakeUser: true }]);

    return signUpPost(dispatch, null, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.REQUEST_LOGIN,
        payload: [{ fakeUser: true }],
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.REQUIRED_AUTHORIZATION,
        payload: false,
      });
    });
  });

  it("Should make a get request to /autoAuth", async () => {
    const dispatch = jest.fn();
    const autoAuthGet = Operations.autoAuth();

    apiMock.onGet("/auth/auto-auth").reply(200, [{ fakeUser: true }]);

    return autoAuthGet(dispatch, null, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.REQUEST_LOGIN,
        payload: [{ fakeUser: true }],
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.REQUIRED_AUTHORIZATION,
        payload: false,
      });
    });
  });
});

describe(`reducer works correctly`, () => {
  it(`undefined action doesnt affect the state`, () => {
    expect(reducer(undefined, {})).toEqual({
      isAuthorizationRequired: true,
      user: {},
      popupModal: false,
    });
  });

  it(`sign up user`, () => {
    expect(
      reducer(
        {
          user: {},
        },
        {
          type: `REQUEST_SIGNUP`,
          payload: { name: "John", email: "test@test.com" },
        }
      )
    ).toEqual({
      user: { name: "John", email: "test@test.com" },
    });
  });

  it(`logs in user`, () => {
    expect(
      reducer(
        {
          user: {},
        },
        {
          type: `REQUEST_LOGIN`,
          payload: { name: "John", email: "test@test.com" },
        }
      )
    ).toEqual({
      user: { name: "John", email: "test@test.com" },
    });
  });

  it(`changes isAuthorizationRequired`, () => {
    expect(
      reducer(
        {
          isAuthorizationRequired: true,
        },
        {
          type: `REQUIRED_AUTHORIZATION`,
          payload: false,
        }
      )
    ).toEqual({
      isAuthorizationRequired: false,
    });
  });

  it(`toggles popupModal`, () => {
    expect(
      reducer(
        {
          popupModal: false,
        },
        {
          type: `TOGGLE_POPUP`,
        }
      )
    ).toEqual({
      popupModal: true,
    });
  });
});

describe(`action creators works correctly`, () => {
  it(`requestSignUp returns correct value`, () => {
    expect(
      ActionCreator.requestSignUp({ name: "John", email: "test@test.com" })
    ).toEqual({
      type: ActionType.REQUEST_SIGNUP,
      payload: { name: "John", email: "test@test.com" },
    });
  });

  it(`requestLogin returns correct value`, () => {
    expect(
      ActionCreator.requestLogin({ name: "John", email: "test@test.com" })
    ).toEqual({
      type: ActionType.REQUEST_LOGIN,
      payload: { name: "John", email: "test@test.com" },
    });
  });

  it(`requireAuthorization returns correct value`, () => {
    expect(ActionCreator.requireAuthorization(true)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: true,
    });
  });

  it(`logoutUser returns correct value`, () => {
    expect(ActionCreator.logoutUser()).toEqual({
      type: ActionType.LOGOUT_USER,
    });
  });

  it(`togglePopup returns correct value`, () => {
    expect(ActionCreator.togglePopup()).toEqual({
      type: ActionType.TOGGLE_POPUP,
    });
  });
});
