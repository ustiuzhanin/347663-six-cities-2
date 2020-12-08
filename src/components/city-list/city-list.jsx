import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ActionCreator, Operations } from "../../reducer/city-list/city-list";

const CityList = (props) => {
  const { loadCityList, listOfCities, activeCity, onCityLinkClick } = props;

  useEffect(() => {
    loadCityList();
  }, []);

  const handleCityLinkClick = (evt) => {
    evt.preventDefault();
    if (evt.currentTarget.id !== activeCity) {
      onCityLinkClick(evt.currentTarget.id);
    }
  };

  return listOfCities.map((city, i) => (
    <li className="locations__item" key={`${city}${i}`}>
      <a
        className={`locations__item-link tabs__item ${
          city === activeCity && `tabs__item--active`
        }`}
        href="#"
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
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
  listOfCities: PropTypes.array.isRequired,
  activeCity: PropTypes.string.isRequired,
  onCityLinkClick: PropTypes.func.isRequired,
  loadCityList: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    activeCity: state.cityList.activeCity,
    listOfCities: state.cityList.listOfCities,
  });

const mapDispatchToProps = (dispatch) => ({
  onCityLinkClick: (activeCityId) => {
    dispatch(ActionCreator.changeCity(activeCityId));
  },
  loadCityList: () => {
    dispatch(Operations.loadCityList());
  },
});

export { CityList };

export default connect(mapStateToProps, mapDispatchToProps)(CityList);
