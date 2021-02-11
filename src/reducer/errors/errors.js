const initialState = {
  errorMessage: {},
};

const ActionType = {
  SHOW_ERROR_MESSAGE: `SHOW_ERROR_MESSAGE`,
};

const ActionCreator = {
  showErrorMessage: (err) => {
    return {
      type: ActionType.SHOW_ERROR_MESSAGE,
      payload: err,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SHOW_ERROR_MESSAGE:
      return Object.assign({}, state, {
        errorMessage: action.payload,
      });
  }

  return state;
};

export { ActionCreator, ActionType, reducer };
