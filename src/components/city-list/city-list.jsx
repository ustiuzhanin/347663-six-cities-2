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

  return listOfCities.map(({ name }, i) => (
    <li className="locations__item" key={`${name}${i}`}>
      <a
        className={`locations__item-link tabs__item ${
          name === activeCity && `tabs__item--active`
        }`}
        href="#"
        id={name}
        onClick={(e) => handleCityLinkClick(e)}
      >
        <span>{name}</span>
      </a>
    </li>
  ));
};

CityList.propTypes = {
  activeCity: PropTypes.string.isRequired,
  onCityLinkClick: PropTypes.func.isRequired,
  loadCityList: PropTypes.func.isRequired,
  listOfCities: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
      }),
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
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
