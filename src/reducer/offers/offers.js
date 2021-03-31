import qs from "qs";

const initialState = {
  sorting: { type: "popular", text: "Popular" },
  cityOffers: [],
  offers: [],
  offer: null,
  offersInRadius: [],
};

const ActionType = {
  CHANGE_SORTING: "CHANGE_SORTING",
  LOAD_OFFER: "LOAD_OFFER",
  LOAD_CITY_OFFERS: "LOAD_CITY_OFFERS",
  LOAD_OFFERS: "LOAD_OFFERS",
  CLEAR_OFFERS: "CLEAR_OFFERS",
  ADD_OFFERS_IN_RADIUS: "ADD_OFFERS_IN_RADIUS",
  RESET_OFFERS_IN_RADIUS: "RESET_OFFERS_IN_RADIUS",
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

  loadOffers: (data) => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: data,
    };
  },

  clearOffers: () => {
    return { type: ActionType.CLEAR_OFFERS };
  },

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

const Operations = {
  loadOffer: (offerId) => (dispatch, getState, api) => {
    return api.get(`/offer/${offerId}`).then((response) => {
      dispatch(ActionCreator.loadOffer(response.data));
    });
  },

  loadCityOffers: (city) => (dispatch, getState, api) => {
    return api.get(`/city-offers/${city}`).then((response) => {
      dispatch(ActionCreator.loadCityOffers(response.data));
    });
  },

  loadOffers: (offersArr) => (dispatch, getState, api) => {
    return api
      .get("/offers", {
        params: { offers: offersArr },
        paramsSerializer: (params) => {
          return qs.stringify(params);
        },
      })
      .then((response) => {
        dispatch(ActionCreator.loadOffers(response.data));
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
    case ActionType.LOAD_OFFERS:
      return Object.assign({}, state, {
        offers: action.payload,
      });
    case ActionType.CLEAR_OFFERS:
      return Object.assign({}, state, {
        offers: null,
      });
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

export { ActionType, ActionCreator, Operations, reducer };
