const initialState = {
  listOfOffers: [],
  sorting: { type: "popular", text: "Popular" },
};

const ActionType = {
  ADD_OFFERS: "ADD_OFFERS",
  CHANGE_SORTING: "CHANGE_SORTING",
  RESET_OFFERS_LIST: "RESET_OFFERS_LIST",
};

const ActionCreator = {
  addActiveCityOffers: (offers) => {
    return {
      type: `ADD_OFFERS`,
      payload: offers,
    };
  },
  resetOffersList: () => {
    return {
      type: ActionType.RESET_OFFERS_LIST,
    };
  },
  changeSorting: (type) => {
    return {
      type: ActionType.CHANGE_SORTING,
      payload: type,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ADD_OFFERS:
      return Object.assign({}, state, {
        listOfOffers: [...state.listOfOffers, ...action.payload],
      });
    case ActionType.RESET_OFFERS_LIST:
      return Object.assign({}, state, {
        listOfOffers: [],
      });
    case ActionType.CHANGE_SORTING:
      return Object.assign({}, state, {
        sorting: action.payload,
      });
  }
  return state;
};

export { ActionType, ActionCreator, reducer };
