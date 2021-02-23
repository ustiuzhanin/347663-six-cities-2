import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Operations } from "../../reducer/user/user";
import { ActionCreator } from "./../../reducer/active-card/active-card";
import { ActionCreator as ActionCraetorAuth } from "../../reducer/auth/auth";

const Card = (props) => {
  const {
    card,
    changeActiveCard,
    changeBookmark,
    openAuthPopup,
    isAuthorizationRequired,
    user,
  } = props;
  const { price, rating, title, type, preview_image, _id } = card;

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!card || !user.bookmarks) return;

    if (user.bookmarks.indexOf(card._id) !== -1) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [card, user]);

  const cardMouseEnterHandler = (cardItem) => {
    changeActiveCard(cardItem);
  };

  const cardMouseLeaveHandler = () => {
    changeActiveCard({});
  };

  const bookmarkClickHandler = () => {
    if (isAuthorizationRequired) {
      openAuthPopup();
    } else {
      setIsFavorite(!isFavorite);
      changeBookmark(_id);
    }
  };

  const ratingToPercent = (stars) => (stars / 5) * 100;

  return (
    <article
      className="cities__place-card place-card"
      onMouseEnter={() => cardMouseEnterHandler(props.card)}
      onMouseLeave={cardMouseLeaveHandler}
    >
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a>
          <img
            className="place-card__image"
            src={preview_image}
            width="260"
            height="200"
            alt="Place image"
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${
              isFavorite && "place-card__bookmark-button--active"
            } button`}
            type="button"
            onClick={() => bookmarkClickHandler()}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${ratingToPercent(rating)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${_id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

Card.propTypes = {
  isAuthorizationRequired: PropTypes.bool.isRequired,
  changeBookmark: PropTypes.func.isRequired,
  changeActiveCard: PropTypes.func.isRequired,
  openAuthPopup: PropTypes.func.isRequired,
  card: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    bedrooms: PropTypes.number.isRequired,
    city: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }),
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
  }).isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    bookmarks: PropTypes.array.isRequired,
    email: PropTypes.string.isRequired,
    is_pro: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    offers: PropTypes.array.isRequired,
  }),
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    isAuthorizationRequired: state.auth.isAuthorizationRequired,
    user: state.user.user,
  });

const mapDispatchToProps = (dispatch) => ({
  changeActiveCard: (card) => {
    dispatch(ActionCreator.changeActiveCard(card));
  },
  changeBookmark: (id) => {
    dispatch(Operations.changeBookmark(id));
  },
  openAuthPopup: () => {
    dispatch(ActionCraetorAuth.togglePopup());
  },
});

export { Card };

export default connect(mapStateToProps, mapDispatchToProps)(Card);
