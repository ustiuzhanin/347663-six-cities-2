const initialState = {
  offersInRadius: [],
};

const ActionType = {
  ADD_OFFERS_IN_RADIUS: "ADD_OFFERS_IN_RADIUS",
};

const ActionCreator = {
  addOffersInRadius: (offers) => {
    return {
      type: `ADD_OFFERS_IN_RADIUS`,
      payload: offers,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ADD_OFFERS_IN_RADIUS:
      return Object.assign({}, state, {
        offersInRadius: [...state.offersInRadius, ...action.payload],
      });
  }
  return state;
};

export { ActionType, ActionCreator, reducer };
