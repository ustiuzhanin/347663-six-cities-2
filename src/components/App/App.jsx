import React from 'react';
import Home from '../Home/Home.jsx';
import PropTypes from 'prop-types';

export default function App(props) {
  const {offers} = props;

  const onCardHeaderClick = () => {
    // TODO: opens the card page/info
  };

  return <Home places={offers} onCardHeaderClick={onCardHeaderClick} />;
}

App.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        src: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        rating: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
      }).isRequired
  ).isRequired
};
