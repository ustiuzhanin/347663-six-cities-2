import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionsCreator} from "../../reducer";

const CityList = (props) => {
  useEffect(() => {
    const {offers, createListOfCities} = props;

    const listOfCities = [];
    offers.filter(({city}) => {
      if (!listOfCities.includes(city.name)) {
        listOfCities.push(city.name);
      }
    });

    createListOfCities(listOfCities);
  }, []);

  const handleCityLinkClick = (evt) => {
    const {activeCity, onCityLinkClick, resetOffersList} = props;

    onCityLinkClick(evt.currentTarget.id);
    if (activeCity !== evt.currentTarget.id) {
      resetOffersList();
    }
  };

  const cityList = (list, currentActiveCity) => {
    return list.map((city, i) => (
      <li className="locations__item" key={`${city}${i}`}>
        <a
          className={`locations__item-link tabs__item ${city ===
            currentActiveCity && `tabs__item--active`}`}
          href="#"
          id={city}
          onClick={handleCityLinkClick}
        >
          <span>{city}</span>
        </a>
      </li>
    ));
  };

  const {listOfCities, activeCity} = props;

  return cityList(listOfCities, activeCity);
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
  createListOfCities: PropTypes.func.isRequired,
  resetOffersList: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    activeCity: state.activeCity,
    listOfCities: state.listOfCities
  });

const mapDispatchToProps = (dispatch) => ({
  onCityLinkClick: (activeCityId) => {
    dispatch(ActionsCreator.changeCity(activeCityId));
  },
  createListOfCities: (listOfCities) => {
    dispatch(ActionsCreator.createListOfCities(listOfCities));
  },
  resetOffersList: () => {
    dispatch(ActionsCreator.resetOffersList());
  }
});

export {CityList};

export default connect(mapStateToProps, mapDispatchToProps)(CityList);
