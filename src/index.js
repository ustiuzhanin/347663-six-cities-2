import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.jsx';
import {offers} from './mocks/offers';

const init = (placeOffers) => {
  ReactDOM.render(
      <App offers={placeOffers} />,
      document.getElementById(`root`)
  );
};

init(offers);
