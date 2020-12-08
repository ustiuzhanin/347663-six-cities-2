const initialState = {
  sorting: { type: "popular", text: "Popular" },
  cityOffers: [],
};

const ActionType = {
  CHANGE_SORTING: "CHANGE_SORTING",
  LOAD_OFFER: "LOAD_OFFER",
  LOAD_CITY_OFFERS: "LOAD_CITY_OFFERS",
};

const ActionCreator = {
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
