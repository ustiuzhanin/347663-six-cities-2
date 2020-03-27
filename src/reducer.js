const ActionsCreator = {
  changeCity: (city) => {
    return {
      type: `CHANGE_CITY`,
      payload: city
    };
  },
  createListOfCities: (cities) => {
    return {
      type: `CREATE_LIST_OF_CITIES`,
      payload: cities
    };
  },
  resetOffersList: () => {
    return {
      type: `RESET_OFFERS_LIST`
    };
  },
  addActiveCityOffers: (offers) => {
    return {
      type: `ADD_OFFERS`,
      payload: offers
    };
  },
  loadData: (data) => {
    return {
      type: 'LOAD_DATA',
      payload: data
    };
  }
};

const Operations = {
  loadData: () => (dispatch, getState, api) => {
    return api.get(`/hotels`).then((response) => {
      dispatch(ActionsCreator.loadData(response.data));
    });
  }
};

const initialState = {
  data: [],
  activeCity: `Amsterdam`,
  listOfOffers: [],
  listOfCities: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `CHANGE_CITY`:
      return Object.assign({}, state, {
        activeCity: action.payload
      });
    case `CREATE_LIST_OF_CITIES`: {
      return Object.assign({}, state, {
        listOfCities: [...state.listOfCities, ...action.payload]
      });
    }
    case `RESET_OFFERS_LIST`:
      return Object.assign({}, state, {
        listOfOffers: []
      });
    case `ADD_OFFERS`:
      return Object.assign({}, state, {
        listOfOffers: [...state.listOfOffers, ...action.payload]
      });
    case 'LOAD_DATA':
      return Object.assign({}, state, {
        data: action.payload
      });
  }
  return state;
};

export {ActionsCreator, reducer, Operations};
