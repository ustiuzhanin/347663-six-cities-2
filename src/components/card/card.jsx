import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { withRouter } from "react-router";
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
  const { price, rating, title, type, preview_image, _id, is_favorite } = card;

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user.bookmarks) {
      user.bookmarks.indexOf(card._id) !== -1
        ? setIsFavorite(true)
        : setIsFavorite(false);
    } else {
      setIsFavorite(false);
    }

    // if (user && user.bookmarks.indexOf(card._id) !== -1) {
    //   console.log(user.bookmarks.indexOf(card._id));
    //   setIsFavorite(true);
    // } else {
    //   setIsFavorite(false);
    // }
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
          {/* <button
            className="place-card__bookmark-button place-card__bookmark-button--active button"
            type="button"
          > */}
          <button
            className={`place-card__bookmark-button ${
              isFavorite && "place-card__bookmark-button--active"
            } button`}
            type="button"
            onClick={(evt) => bookmarkClickHandler()}
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
  card: PropTypes.shape({
    price: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    preview_image: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  changeActiveCard: PropTypes.func.isRequired,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Card));
