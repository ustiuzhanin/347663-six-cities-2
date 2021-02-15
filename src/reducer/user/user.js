const initialState = {
  user: {},
};

const ActionType = {
  GET_USER: `GET_USER`,
};

const ActionCreator = {
  getUser: (user) => {
    return {
      type: ActionType.GET_USER,
      payload: user,
    };
  },
};

const Operations = {
  getUser: (id) => (dispatch, getState, api) => {
    return api
      .get(`/get-user/${id}`)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
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
        console.log(response);
      })
      .catch((err) => console.log(err));
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_USER:
      return Object.assign({}, state, {
        user: action.payload,
      });
  }

  return state;
};

export { ActionCreator, ActionType, Operations, reducer };
