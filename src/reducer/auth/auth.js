const initialState = {
  isAuthorizationRequired: true,
  user: {},
};

const ActionType = {
  REQUEST_SIGNUP: `REQUEST_SIGNUP`,
  REQUEST_LOGIN: `REQUEST_LOGIN`,
  LOGOUT_USER: "LOGOUT_USER",
  REQUIRED_AUTHORIZATION: "REQUIRED_AUTHORIZATION",
};

const ActionCreator = {
  requestSignUp: (user) => {
    return {
      type: ActionType.REQUEST_SIGNUP,
      payload: user,
    };
  },

  requestLogin: (user) => {
    return {
      type: ActionType.REQUEST_LOGIN,
      payload: user,
    };
  },

  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },

  logoutUser: () => {
    return {
      type: ActionType.LOGOUT_USER,
    };
  },
};

const Operations = {
  requestSignUp: (email, password, name) => (dispatch, getState, api) => {
    return api
      .post(`/auth/signup`, { email, password, name })
      .then((response) => {
        if (response.status === 201) {
          dispatch(ActionCreator.requestSignUp(response.data));
          return api.post(`/auth/login`, { email, password });
        }
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(ActionCreator.requestLogin(response.data));
          dispatch(ActionCreator.requireAuthorization(false));
        }
      });
  },
  requestLogin: (email, password) => (dispatch, getState, api) => {
    return api
      .post(`/auth/login`, { email, password })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          dispatch(ActionCreator.requestLogin(response.data));
          dispatch(ActionCreator.requireAuthorization(false));
        }
      })
      .catch((err) => console.log(err));
  },
  autoAuth: () => (dispatch, getState, api) => {
    const token = localStorage.token;

    if (!token) {
      return;
    }

    return api
      .get(`auth/auto-auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(ActionCreator.requestLogin(response.data));
          dispatch(ActionCreator.requireAuthorization(false));
        } else {
          localStorage.removeItem("token");
        }
      })
      .catch((err) => console.log(err));
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUEST_SIGNUP:
    case ActionType.REQUEST_LOGIN:
      return Object.assign({}, state, {
        user: action.payload,
      });

    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload,
      });

    case ActionType.LOGOUT_USER:
      return Object.assign({}, state, {
        user: {},
      });
  }

  return state;
};

export { ActionCreator, ActionType, Operations, reducer };
