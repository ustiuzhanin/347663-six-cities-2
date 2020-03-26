import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {compose} from 'recompose';
import configureAPI from './api';

import App from './components/app/app.jsx';
import {offers} from './mocks/offers';
import {reducer} from './reducer';

const init = (placeOffers) => {
  const api = configureAPI((...args) => store.dispatch(...args));

  const store = createStore(
    reducer,
    compose(
      applyMiddleware(thunk.withExtraArgument(api)),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f) => f
    )
  );

  ReactDOM.render(
    <Provider store={store}>
      <App offers={placeOffers} />
    </Provider>,
    document.getElementById(`root`)
  );
};

init(offers);
