const initialState = {
  isAuthorizationRequired: true,
  user: {},
};

const ActionType = {
  REQUEST_SIGNUP: `REQUEST_SIGNUP`,
  REQUIRED_AUTHORIZATION: "REQUIRED_AUTHORIZATION",
};

const ActionCreator = {
  requestSignUp: (user) => {
    return {
      type: ActionType.REQUEST_SIGNUP,
      payload: user,
    };
  },

  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },
};

const Operations = {
  // requestSignUp: (email, password) => (dispatch, getState, api) => {
  //   return api.post(`/login`, {email, password}).then((response) => {
  //     dispatch(ActionCreator.requestSignUp(response.data));
  //     if (response.status === 200) {
  //       dispatch(ActionCreator.requireAuthorization(false));
  //     }
  //   });
  // }
  requestSignUp: (email, password, name) => (dispatch, getState, api) => {
    return api
      .post(`/auth/signup`, { email, password, name })
      .then((response) => {
        dispatch(ActionCreator.requestSignUp(response.data));
        if (response.status === 200) {
          dispatch(ActionCreator.requireAuthorization(false));
        }
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUEST_SIGNUP:
      return Object.assign({}, state, {
        user: action.payload,
      });

    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload,
      });
  }

  return state;
};

export { ActionCreator, ActionType, Operations, reducer };
