const initialState = {
  user: {},
};

const ActionType = {
  GET_USER: `GET_USER`,
  CHANGE_USER: `CHANGE_USER`,
  CLEAR_USER: "CLEAR_USER",
};

const ActionCreator = {
  getUser: (user) => {
    return {
      type: ActionType.GET_USER,
      payload: user,
    };
  },
  changeUser: (user) => {
    return {
      type: ActionType.CHANGE_USER,
      payload: user,
    };
  },
  clearUser: () => {
    return {
      type: ActionType.CLEAR_USER,
    };
  },
};

const Operations = {
  getUser: (id) => (dispatch, getState, api) => {
    return api
      .get(`/get-user/${id}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(ActionCreator.getUser(response.data));
        }
      })
      .catch((err) => console.log(err));
  },
  changeBookmark: (id) => (dispatch, getState, api) => {
    const token = localStorage.token;
    return api
      .put(
        `/change-bookmark/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch(ActionCreator.changeUser(response.data));
      })
      .catch((err) => console.log(err));
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_USER:
    case ActionType.CHANGE_USER:
      return Object.assign({}, state, {
        user: action.payload,
      });
    case ActionType.CLEAR_USER: {
      return Object.assign({}, state, {
        user: {},
      });
    }
  }

  return state;
};

export { ActionCreator, ActionType, Operations, reducer };
