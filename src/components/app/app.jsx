import React from 'react';
import {connect} from 'react-redux';

import Home from '../home/home.jsx';
import PropTypes from 'prop-types';

const App = (props) => {
  const {offers} = props;

  const onCardHeaderClick = () => {
    // TODO: opens the card page/info
  };

  return (
    // TODO: change key
    <Home
      offersData={offers}
      onCardHeaderClick={onCardHeaderClick}
      key={Math.random()}
    />
  );
};

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

const mapStateToProps = (state) =>
  Object.assign({}, null, {
    offers: state.data
  });

export {App};
export default connect(mapStateToProps, null)(App);
