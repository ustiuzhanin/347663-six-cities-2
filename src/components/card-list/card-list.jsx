import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ActionsCreator} from '../../reducer';
import PropTypes from 'prop-types';

import Card from '../card/card.jsx';

/* eslint-disable camelcase*/

class CardList extends Component {
  componentDidMount() {
    const {activeCity, offers, addActiveCityOffers} = this.props;
    const activeCityOffers = [];

    offers.filter((offer) => {
      const {city} = offer;

      if (city.name === activeCity) {
        activeCityOffers.push(offer);
      }
    });

    addActiveCityOffers(activeCityOffers);
  }

  componentDidUpdate(prevProps) {
    const {offers, activeCity, addActiveCityOffers} = this.props;

    if (prevProps.activeCity !== activeCity) {
      let activeCityOffers = [];

      offers.filter((offer) => {
        const {city} = offer;

        if (city.name === activeCity) {
          activeCityOffers.push(offer);
        }
      });

      addActiveCityOffers(activeCityOffers);
    }
  }

  render() {
    const {
      listOfOffers,
      onCardHeaderClick,
      activeCity,
      cardMouseEnterHandler,
      cardMouseLeaveHandler
    } = this.props;

    return (
      <section className='cities__places places'>
        <h2 className='visually-hidden'>Places</h2>
        <b className='places__found'>
          {listOfOffers.length} places to stay in {activeCity}
        </b>
        <form className='places__sorting' action='#' method='get'>
          <span className='places__sorting-caption'>Sort by</span>
          <span className='places__sorting-type' tabIndex='0'>
            Popular
            <svg className='places__sorting-arrow' width='7' height='4'>
              <use xlinkHref='#icon-arrow-select'></use>
            </svg>
          </span>
          <ul className='places__options places__options--custom places__options--opened'>
            <li className='places__option places__option--active' tabIndex='0'>
              Popular
            </li>
            <li className='places__option' tabIndex='0'>
              Price: low to high
            </li>
            <li className='places__option' tabIndex='0'>
              Price: high to low
            </li>
            <li className='places__option' tabIndex='0'>
              Top rated first
            </li>
          </ul>

          {/* <select className='places__sorting-type' id='places-sorting'>
            <option className='places__option' value='popular' selected=''>
              Popular
            </option>
            <option className='places__option' value='to-high'>
              Price: low to high
            </option>
            <option className='places__option' value='to-low'>
              Price: high to low
            </option>
            <option className='places__option' value='top-rated'>
              Top rated first
            </option>
          </select> */}
        </form>
        <div className='cities__places-list places__list tabs__content'>
          {listOfOffers.map((card) => (
            <Card
              key={card.id}
              card={card}
              cardMouseEnterHandler={cardMouseEnterHandler}
              cardMouseLeaveHandler={cardMouseLeaveHandler}
              onCardHeaderClick={onCardHeaderClick}
            />
          ))}
        </div>
      </section>
    );
  }
}

CardList.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        price: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        preview_image: PropTypes.string.isRequired
      }).isRequired
  ).isRequired,
  listOfOffers: PropTypes.arrayOf(
      PropTypes.shape({
        price: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        preview_image: PropTypes.string.isRequired
      }).isRequired
  ).isRequired,
  activeCity: PropTypes.string.isRequired,
  addActiveCityOffers: PropTypes.func.isRequired,
  onCardHeaderClick: PropTypes.func.isRequired,
  cardMouseEnterHandler: PropTypes.func.isRequired,
  cardMouseLeaveHandler: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    activeCity: state.activeCity,
    listOfOffers: state.listOfOffers
  });

const mapDispatchToProps = (dispatch) => ({
  addActiveCityOffers: (activeOffers) => {
    dispatch(ActionsCreator.addActiveCityOffers(activeOffers));
  }
});

export {CardList};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardList);

/* eslint-enable camelcase*/
