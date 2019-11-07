import React from 'react';
import Home from '../home/home.jsx';
import PropTypes from 'prop-types';

export default function App(props) {
  const {offers} = props;

  const onCardHeaderClick = () => {
    // TODO: opens the card page/info
  };

  return <Home offersData={offers} onCardHeaderClick={onCardHeaderClick} />;
}

App.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        city: PropTypes.shape({
          location: PropTypes.shape({
            latitude: PropTypes.number.isRequired,
            longitude: PropTypes.number.isRequired,
            zoom: PropTypes.number.isRequired
          }).isRequired
        }).isRequired,

        id: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        location: PropTypes.shape({
          latitude: PropTypes.number.isRequired,
          longitude: PropTypes.number.isRequired,
          zoom: PropTypes.number.isRequired
        }).isRequired
      }).isRequired
  ).isRequired
};
