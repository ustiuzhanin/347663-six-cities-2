const initialState = {
  activeCard: {},
};

const ActionType = {
  CHANGE_ACTIVE_CARD: "CHANGE_ACTIVE_CARD",
};

const ActionCreator = {
  changeActiveCard: (card) => {
    return {
      type: ActionType.CHANGE_ACTIVE_CARD,
      payload: card,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_ACTIVE_CARD:
      return Object.assign({}, state, {
        activeCard: action.payload,
      });
  }

  return state;
};

export { ActionCreator, ActionType, reducer };
