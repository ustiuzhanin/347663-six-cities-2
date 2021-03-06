const initialState = {
  activeCity: "Amsterdam",
  listOfCities: [],
};

const ActionType = {
  CHANGE_CITY: "CHANGE_CITY",
  CREATE_LIST_OF_CITIES: "CREATE_LIST_OF_CITIES",
};

const ActionCreator = {
  changeCity: (city) => {
    return {
      type: ActionType.CHANGE_CITY,
      payload: city,
    };
  },
  loadCityList: (cities) => {
    return {
      type: ActionType.CREATE_LIST_OF_CITIES,
      payload: cities,
    };
  },
};

const Operations = {
  loadCityList: () => (dispatch, getState, api) => {
    return api.get(`/cities`).then((response) => {
      dispatch(ActionCreator.loadCityList(response.data));
    });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return Object.assign({}, state, {
        activeCity: action.payload,
      });
    case ActionType.CREATE_LIST_OF_CITIES:
      return Object.assign({}, state, {
        listOfCities: [...action.payload],
      });
  }

  return state;
};

export { ActionCreator, ActionType, Operations, reducer };
