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
        coords: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
        offers: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.number.isRequired,
              src: PropTypes.string.isRequired,
              price: PropTypes.string.isRequired,
              rating: PropTypes.string.isRequired,
              name: PropTypes.string.isRequired,
              type: PropTypes.string.isRequired,
              location: PropTypes.array.isRequired
            }).isRequired
        ).isRequired
      }).isRequired
  ).isRequired
};
