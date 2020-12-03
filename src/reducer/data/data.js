const initialState = {
  data: [],
};

const ActionType = {
  LOAD_DATA: "LOAD_DATA",
};

const ActionCreator = {
  loadData: (data) => {
    return {
      type: ActionType.LOAD_DATA,
      payload: data,
    };
  },
};

const Operations = {
  loadData: () => (dispatch, getState, api) => {
    return api.get(`/offers`).then((response) => {
      console.log(response);
      dispatch(ActionCreator.loadData(response.data));
    });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_DATA:
      return Object.assign({}, initialState, {
        data: action.payload,
      });
  }

  return state;
};

export { ActionType, ActionCreator, Operations, reducer };
