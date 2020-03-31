import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/city-list/city-list';

const CityList = (props) => {
  useEffect(() => {
    const {offers, createListOfCities} = props;
    const list = [];
    offers.filter(({city}) => {
      if (!list.includes(city.name)) {
        list.push(city.name);
      }
    });

    createListOfCities(list);
  }, []);

  const handleCityLinkClick = (evt) => {
    evt.preventDefault();
    const {onCityLinkClick, activeCity} = props;
    if (evt.currentTarget.id !== activeCity) {
      onCityLinkClick(evt.currentTarget.id);
    }
  };

  const {listOfCities, activeCity} = props;

  return listOfCities.map((city, i) => (
    <li className='locations__item' key={`${city}${i}`}>
      <a
        className={`locations__item-link tabs__item ${city === activeCity &&
          `tabs__item--active`}`}
        href='#'
        id={city}
        onClick={(e) => handleCityLinkClick(e)}
      >
        <span>{city}</span>
      </a>
    </li>
  ));
};

CityList.propTypes = {
  offers: PropTypes.arrayOf(
    PropTypes.shape({
      city: PropTypes.shape({
        name: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  ).isRequired,
  listOfCities: PropTypes.array.isRequired,
  activeCity: PropTypes.string.isRequired,
  onCityLinkClick: PropTypes.func.isRequired,
  createListOfCities: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    activeCity: state.cityList.activeCity,
    listOfCities: state.cityList.listOfCities
  });

const mapDispatchToProps = (dispatch) => ({
  onCityLinkClick: (activeCityId) => {
    dispatch(ActionCreator.changeCity(activeCityId));
  },
  createListOfCities: (listOfCities) => {
    dispatch(ActionCreator.createListOfCities(listOfCities));
  },
  resetListOfCities: () => {
    dispatch(ActionCreator.resetListOfCities());
  }
});

export {CityList};

export default connect(mapStateToProps, mapDispatchToProps)(CityList);
