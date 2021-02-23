import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import Card from "../card/card.jsx";
import { ActionCreator, Operations } from "../../reducer/offers/offers";

/* eslint-disable camelcase*/

const SortingType = {
  POPULAR: "popular",
  RATING: "price-raitig",
  PRICE_LOW_TO_HIGH: "price-low",
  PRICE_HIGH_TO_LOW: "price-high",
};

const CardList = (props) => {
  const {
    activeCity,
    cityOffers,
    sorting,
    changeSortingType,
    loadCityOffers,
  } = props;

  const [isSortPopupOpen, setIsSortPopupOpen] = useState(false);

  useEffect(() => {
    const closeSelect = () => {
      setIsSortPopupOpen(false);

      document.removeEventListener("click", closeSelect);
    };

    if (isSortPopupOpen) {
      document.addEventListener("click", closeSelect);
    }
  });

  useEffect(() => {
    loadCityOffers(activeCity);
  }, [activeCity]);

  const sortingClickHandler = () => {
    setIsSortPopupOpen(!isSortPopupOpen);
  };

  const optionClickHandler = (e) => {
    if (e.target.id !== sorting.type) {
      setIsSortPopupOpen(false);

      changeSortingType({ type: e.target.id, text: e.target.innerText });
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
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">
        {cityOffers.length} places to stay in {activeCity}
      </b>
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span
          className="places__sorting-type"
          tabIndex="0"
          onClick={sortingClickHandler}
        >
          {sorting.text}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul
          className={`places__options places__options--custom ${
            isSortPopupOpen ? "places__options--opened" : null
          }`}
        >
          <li
            className="places__option"
            tabIndex="0"
            onClick={(evt) => optionClickHandler(evt)}
            id="popular"
          >
            Popular
          </li>
          <li
            className="places__option"
            tabIndex="0"
            onClick={(evt) => optionClickHandler(evt)}
            id="price-low"
          >
            Price: low to high
          </li>
          <li
            className="places__option"
            tabIndex="0"
            onClick={(evt) => optionClickHandler(evt)}
            id="price-high"
          >
            Price: high to low
          </li>
          <li
            className="places__option"
            tabIndex="0"
            onClick={(evt) => optionClickHandler(evt)}
            id="price-raitig"
          >
            Top rated first
          </li>
        </ul>
      </form>
      <div className="cities__places-list places__list tabs__content">
        {sortOffers(sorting, cityOffers).map((card) => (
          <Card key={card._id} card={card} />
        ))}
      </div>
    </section>
  );
};

CardList.propTypes = {
  activeCity: PropTypes.string.isRequired,
  changeSortingType: PropTypes.func.isRequired,
  loadCityOffers: PropTypes.func.isRequired,
  sorting: PropTypes.shape({
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  cityOffers: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      bedrooms: PropTypes.number.isRequired,
      city: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        location: PropTypes.shape({
          latitude: PropTypes.number.isRequired,
          longitude: PropTypes.number.isRequired,
          zoom: PropTypes.number.isRequired,
        }),
        name: PropTypes.string.isRequired,
      }),
      description: PropTypes.string.isRequired,
      goods: PropTypes.array.isRequired,
      host: PropTypes.string.isRequired,
      images: PropTypes.array.isRequired,
      is_premium: PropTypes.bool.isRequired,
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
      }).isRequired,
      max_adults: PropTypes.number.isRequired,
      preview_image: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    activeCity: state.cityList.activeCity,
    cityOffers: state.offers.cityOffers,
    sorting: state.offers.sorting,
  });

const mapDispatchToProps = (dispatch) => ({
  changeSortingType: (type) => {
    dispatch(ActionCreator.changeSorting(type));
  },
  loadCityOffers: (city) => {
    dispatch(Operations.loadCityOffers(city));
  },
});

export { CardList };

export default connect(mapStateToProps, mapDispatchToProps)(CardList);

/* eslint-enable camelcase*/
