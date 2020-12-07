const initialState = {
  listOfOffers: [],
  sorting: { type: "popular", text: "Popular" },
  offer: null,
  cityOffers: null,
};

const ActionType = {
  ADD_OFFERS: "ADD_OFFERS",
  CHANGE_SORTING: "CHANGE_SORTING",
  RESET_OFFERS_LIST: "RESET_OFFERS_LIST",
  LOAD_OFFER: "LOAD_OFFER",
  LOAD_CITY_OFFERS: "LOAD_CITY_OFFERS",
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
  loadOffer: (data) => {
    return {
      type: ActionType.LOAD_OFFER,
      payload: data,
    };
  },

  loadCityOffers: (data) => {
    return {
      type: ActionType.LOAD_CITY_OFFERS,
      payload: data,
    };
  },
};

const Operations = {
  loadOffer: (offerId) => (dispatch, getState, api) => {
    return api.get(`/offer/${offerId}`).then((response) => {
      dispatch(ActionCreator.loadOffer(response.data));
    });
  },

  loadCityOffers: (city) => (dispatch, getState, api) => {
    console.log(city);
    return api.get(`/city-offers/${city}`).then((response) => {
      dispatch(ActionCreator.loadCityOffers(response.data));
    });
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
    case ActionType.LOAD_OFFER:
      return Object.assign({}, state, {
        offer: action.payload,
      });
    case ActionType.LOAD_CITY_OFFERS:
      return Object.assign({}, state, {
        cityOffers: action.payload,
      });
  }
  return state;
};

export { ActionType, ActionCreator, Operations, reducer };
