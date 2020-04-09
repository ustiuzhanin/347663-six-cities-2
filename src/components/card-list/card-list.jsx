import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/offers/offers';
import PropTypes from 'prop-types';

import Card from '../card/card.jsx';

/* eslint-disable camelcase*/

const SortingType = {
  POPULAR: 'popular',
  RATING: 'price-raitig',
  PRICE_LOW_TO_HIGH: 'price-low',
  PRICE_HIGH_TO_LOW: 'price-high',
};

const CardList = (props) => {
  const {
    activeCity,
    offers,
    addActiveCityOffers,
    listOfOffers,
    onCardHeaderClick,
    resetOffers,
    sorting,
    changeSortingType,
  } = props;

  const [isSortPopupOpen, setIsSortPopupOpen] = useState(false);

  useEffect(() => {
    const closeSelect = () => {
      setIsSortPopupOpen(false);

      document.removeEventListener('click', closeSelect);
    };

    if (isSortPopupOpen) {
      document.addEventListener('click', closeSelect);
    }
  });

  useEffect(() => {
    const activeCityOffers = [];
    resetOffers();

    offers.filter((offer) => {
      const {city} = offer;

      if (city.name === activeCity) {
        activeCityOffers.push(offer);
      }
    });

    addActiveCityOffers(activeCityOffers);
  }, [activeCity]);

  const sortingClickHandler = () => {
    setIsSortPopupOpen(!isSortPopupOpen);
  };

  const optionClickHandler = (e) => {
    if (e.target.id !== sorting.type) {
      setIsSortPopupOpen(false);

      changeSortingType({type: e.target.id, text: e.target.innerText});
    }
  };

  const sortOffers = (sort, arr) => {
    switch (sort.type) {
      case SortingType.POPULAR:
        arr.sort((a, b) => {
          return a.id - b.id;
        });
        break;
      case SortingType.RATING:
        arr.sort((a, b) => {
          return b.rating - a.rating;
        });
        break;
      case SortingType.PRICE_LOW_TO_HIGH:
        arr.sort((a, b) => {
          return a.price - b.price;
        });
        break;
      case SortingType.PRICE_HIGH_TO_LOW:
        arr.sort((a, b) => {
          return b.price - a.price;
        });
        break;
    }
    return arr;
  };

  return (
    <section className='cities__places places'>
      <h2 className='visually-hidden'>Places</h2>
      <b className='places__found'>
        {listOfOffers.length} places to stay in {activeCity}
      </b>
      <form className='places__sorting' action='#' method='get'>
        <span className='places__sorting-caption'>Sort by</span>
        <span
          className='places__sorting-type'
          tabIndex='0'
          onClick={sortingClickHandler}
        >
          {sorting.text}
          <svg className='places__sorting-arrow' width='7' height='4'>
            <use xlinkHref='#icon-arrow-select'></use>
          </svg>
        </span>
        <ul
          className={`places__options places__options--custom ${
            isSortPopupOpen ? 'places__options--opened' : null
          }`}
        >
          <li
            className='places__option'
            tabIndex='0'
            onClick={(evt) => optionClickHandler(evt)}
            id='popular'
          >
            Popular
          </li>
          <li
            className='places__option'
            tabIndex='0'
            onClick={(evt) => optionClickHandler(evt)}
            id='price-low'
          >
            Price: low to high
          </li>
          <li
            className='places__option'
            tabIndex='0'
            onClick={(evt) => optionClickHandler(evt)}
            id='price-high'
          >
            Price: high to low
          </li>
          <li
            className='places__option'
            tabIndex='0'
            onClick={(evt) => optionClickHandler(evt)}
            id='price-raitig'
          >
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
        {sortOffers(sorting, listOfOffers).map((card) => (
          <Card
            key={card.id}
            card={card}
            onCardHeaderClick={onCardHeaderClick}
          />
        ))}
      </div>
    </section>
  );
};

CardList.propTypes = {
  offers: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      preview_image: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  listOfOffers: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      preview_image: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  activeCity: PropTypes.string.isRequired,
  addActiveCityOffers: PropTypes.func.isRequired,
  onCardHeaderClick: PropTypes.func.isRequired,
  resetOffers: PropTypes.func.isRequired,
  sorting: PropTypes.shape({
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  changeSortingType: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    activeCity: state.cityList.activeCity,
    listOfOffers: state.offers.listOfOffers,
    sorting: state.offers.sorting,
  });

const mapDispatchToProps = (dispatch) => ({
  addActiveCityOffers: (activeOffers) => {
    dispatch(ActionCreator.addActiveCityOffers(activeOffers));
  },
  changeSortingType: (type) => {
    dispatch(ActionCreator.changeSorting(type));
  },
  resetOffers: () => {
    dispatch(ActionCreator.resetOffersList());
  },
});

export {CardList};

export default connect(mapStateToProps, mapDispatchToProps)(CardList);

/* eslint-enable camelcase*/
