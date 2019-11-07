import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionsCreator} from '../../reducer';

class CityList extends PureComponent {
  componentDidMount() {
    const {offers} = this.props;

    const listOfCities = [];
    offers.map(({city}) => {
      if (!listOfCities.includes(city.name)) {
        listOfCities.push(city.name);
      }
    });

    this.props.createListOfCities(listOfCities);
  }

  render() {
    const {listOfCities, activeCity} = this.props;
    const cityList = listOfCities.map((city, i) => {
      return (
        <li className='locations__item' key={`${city}${i}`}>
          <a
            className={`locations__item-link tabs__item ${city === activeCity &&
              `tabs__item--active`}`}
            href='#'
            id={city}
            onClick={(evt) => {
              this.props.onCityLinkClick(evt.currentTarget.id);
              if (activeCity !== evt.currentTarget.id) {
                this.props.resetOffersList();
              }
            }}
          >
            <span>{city}</span>
          </a>
        </li>
      );
    });
    return cityList;
  }
}

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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CityList);
