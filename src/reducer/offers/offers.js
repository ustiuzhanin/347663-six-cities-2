const initialState = {
  listOfOffers: []
};

const ActionType = {
  ADD_OFFERS: 'ADD_OFFERS',
  RESET_OFFERS_LIST: 'RESET_OFFERS_LIST'
};

const ActionCreator = {
  addActiveCityOffers: (offers) => {
    return {
      type: `ADD_OFFERS`,
      payload: offers
    };
  },
  resetOffersList: () => {
    return {
      type: ActionType.RESET_OFFERS_LIST
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ADD_OFFERS:
      return Object.assign({}, state, {
        listOfOffers: [...state.listOfOffers, ...action.payload]
      });
    case ActionType.RESET_OFFERS_LIST:
      return Object.assign({}, state, {
        listOfOffers: []
      });
  }
  return state;
};

export {ActionType, ActionCreator, reducer};
