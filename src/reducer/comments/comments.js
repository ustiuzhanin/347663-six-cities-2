const initialState = {
  comments: []
};

const ActionType = {
  LOAD_COMMENTS: 'LOAD_COMMENTS'
};

const ActionCreator = {
  loadComments: (data) => {
    return {
      type: ActionType.LOAD_COMMENTS,
      payload: data
    };
  }
};

const Operations = {
  loadComments: (id) => (dispatch, getState, api) => {
    return api.get(`/comments/${id}`).then((response) => {
      dispatch(ActionCreator.loadComments(response.data));
    });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_COMMENTS:
      return Object.assign({}, initialState, {
        comments: action.payload
      });
  }

  return state;
};

export {ActionType, ActionCreator, Operations, reducer};
