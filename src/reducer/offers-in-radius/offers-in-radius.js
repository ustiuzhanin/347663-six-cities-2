const initialState = {
  offersInRadius: [],
};

const ActionType = {
  ADD_OFFERS_IN_RADIUS: "ADD_OFFERS_IN_RADIUS",
  RESET_OFFERS_IN_RADIUS: "RESET_OFFERS_IN_RADIUS",
};

const ActionCreator = {
  addOffersInRadius: (offers) => {
    return {
      type: `ADD_OFFERS_IN_RADIUS`,
      payload: offers,
    };
  },
  resetOffersInRadius: () => {
    return {
      type: "RESET_OFFERS_IN_RADIUS",
      payload: [],
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ADD_OFFERS_IN_RADIUS:
      return Object.assign({}, state, {
        offersInRadius: [...state.offersInRadius, ...action.payload],
      });
    case ActionType.RESET_OFFERS_IN_RADIUS:
      return Object.assign({}, state, {
        offersInRadius: action.payload,
      });
  }
  return state;
};

export { ActionType, ActionCreator, reducer };
