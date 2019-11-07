import {createStore} from 'redux';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app.jsx';
import {offers} from './mocks/offers';
import {reducer} from './reducer';

const init = (placeOffers) => {
  const store = createStore(reducer);

  ReactDOM.render(
      <Provider store={store}>
        <App offers={placeOffers} />
      </Provider>,
      document.getElementById(`root`)
  );
};

init(offers);
