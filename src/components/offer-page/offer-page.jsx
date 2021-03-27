import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Operations } from "../../reducer/offers/offers";
import { Operations as UserOperations } from "../../reducer/user/user";
import { ActionCreator } from "../../reducer/auth/auth";

import PropTypes from "prop-types";

import Header from "../header/header.jsx";
import AuthModal from "../auth-modal/auth-modal.jsx";
// TODO: add comments
// import Comments from "../comments/comments.jsx";
// import CommentForm from "../comment-form/comment-form.jsx";
import Map from "../map/map.jsx";
import Card from "../card/card.jsx";

const OfferPage = (props) => {
  const {
    isAuthorizationRequired,
    offersInRadius,
    loadOffer,
    loadCityOffers,
    card,
    user,
    openAuthPopup,
    changeBookmark,
    popupModal,
  } = props;
  const { id } = props.match.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    loadOffer(id);
  }, [id]);

  useEffect(() => {
    if (card) {
      loadCityOffers(card.city.name);
    }
  }, [card]);

  useEffect(() => {
    if (card && user.bookmarks && user.bookmarks.indexOf(card._id) !== -1) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [card, user]);

  const bookmarkClickHandler = () => {
    if (isAuthorizationRequired) {
      openAuthPopup();
    } else {
      setIsFavorite(!isFavorite);
      changeBookmark(card._id);
    }
  };

  return (
    <div>
      <div style={{ display: "none" }}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id="icon-arrow-select" viewBox="0 0 7 4">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"
            ></path>
          </symbol>
          <symbol id="icon-bookmark" viewBox="0 0 17 18">
            <path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path>
          </symbol>
          <symbol id="icon-star" viewBox="0 0 13 12">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"
            ></path>
          </symbol>
        </svg>
      </div>

      <div className="page">
        <Header />

        {popupModal && <AuthModal />}

        {card && (
          <main className="page__main page__main--property">
            <section className="property">
              <div className="property__gallery-container container">
                <div className="property__gallery">
                  {card.images.map((image, i) => (
                    <div key={i} className="property__image-wrapper">
                      <img
                        className="property__image"
                        src={image}
                        alt="Photo studio"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="property__container container">
                <div className="property__wrapper">
                  <div
                    style={{ display: !card.is_premium && "none" }}
                    className="property__mark"
                  >
                    <span>Premium</span>
                  </div>
                  <div className="property__name-wrapper">
                    <h1 className="property__name">{card.title}</h1>
                    <button
                      className={`${
                        isFavorite && "property__bookmark-button--active "
                      } property__bookmark-button button`}
                      type="button"
                      onClick={() => bookmarkClickHandler()}
                    >
                      <svg
                        className="property__bookmark-icon"
                        width="31"
                        height="33"
                      >
                        <use xlinkHref="#icon-bookmark"></use>
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </button>
                  </div>
                  <div className="property__rating rating">
                    <div className="property__stars rating__stars">
                      <span
                        style={{ width: `${(card.rating / 5) * 100}%` }}
                      ></span>
                      <span className="visually-hidden">Rating</span>
                    </div>
                    <span className="property__rating-value rating__value">
                      {card.rating}
                    </span>
                  </div>
                  <ul className="property__features">
                    <li className="property__feature property__feature--entire">
                      {card.type}
                    </li>
                    <li className="property__feature property__feature--bedrooms">
                      {card.bedrooms}{" "}
                      {card.bedrooms === 1 ? "Bedroom" : "Bedrooms"}
                    </li>
                    <li className="property__feature property__feature--adults">
                      Max {card.max_adults}{" "}
                      {card.max_adults === 1 ? "Adult" : "Adults"}
                    </li>
                  </ul>
                  <div className="property__price">
                    <b className="property__price-value">&euro;{card.price}</b>
                    <span className="property__price-text">&nbsp;night</span>
                  </div>
                  <div className="property__inside">
                    <h2 className="property__inside-title">
                      What&apos;s inside
                    </h2>
                    <ul className="property__inside-list">
                      {card.goods.map((item, i) => (
                        <li key={i} className="property__inside-item">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="property__host">
                    <h2 className="property__host-title">Meet the host</h2>
                    <div className="property__host-user user">
                      <div
                        className={`property__avatar-wrapper user__avatar-wrapper ${
                          card.host.is_pro && "property__avatar-wrapper--pro"
                        }`}
                      >
                        <img
                          className="property__avatar user__avatar"
                          src={`/${card.host.avatar_url}`}
                          width="74"
                          height="74"
                          alt="Host avatar"
                        />
                      </div>
                      <span className="property__user-name">
                        {card.host.name}
                      </span>
                      <span className="property__user-status">Pro</span>
                    </div>
                    <div className="property__description">
                      <p className="property__text">{card.description}</p>
                    </div>
                  </div>
                  {/* <section className="property__reviews reviews">
                    <Comments id={id} />
                    {!isAuthorizationRequired && <CommentForm />}
                  </section> */}
                </div>
              </div>
              <section className="property__map map">
                <Map renderCircle currentOffer={card} />
              </section>
            </section>
            <div className="container">
              <section className="near-places places">
                <h2 className="near-places__title">
                  Other places in the neighbourhood
                </h2>
                <div className="near-places__list places__list">
                  {offersInRadius &&
                    offersInRadius.map((offerCard) => (
                      <Card key={offerCard._id} card={offerCard} />
                    ))}
                </div>
              </section>
            </div>
          </main>
        )}
      </div>
    </div>
  );
};

OfferPage.propTypes = {
  loadOffer: PropTypes.func.isRequired,
  loadCityOffers: PropTypes.func.isRequired,
  openAuthPopup: PropTypes.func.isRequired,
  popupModal: PropTypes.func.isRequired,
  changeBookmark: PropTypes.func.isRequired,
  offersInRadius: PropTypes.arrayOf(
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
    }).isRequired
  ),
  card: PropTypes.shape({
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
    host: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      avatar_url: PropTypes.string.isRequired,
      bookmarks: PropTypes.array.isRequired,
      email: PropTypes.string.isRequired,
      is_pro: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
      offers: PropTypes.array.isRequired,
    }).isRequired,
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
  }),
  user: PropTypes.shape({
    _id: PropTypes.string,
    avatar_url: PropTypes.string,
    bookmarks: PropTypes.array,
    email: PropTypes.string,
    is_pro: PropTypes.bool,
    name: PropTypes.string,
    offers: PropTypes.array,
  }),

  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) =>
  Object.assign({}, null, {
    isAuthorizationRequired: state.auth.isAuthorizationRequired,
    offersInRadius: state.offersInRadius.offersInRadius,
    card: state.offers.offer,
    user: state.user.user,
    popupModal: state.auth.popupModal,
  });

const mapDispatchToProps = (dispatch) => ({
  loadOffer: (id) => {
    dispatch(Operations.loadOffer(id));
  },
  loadCityOffers: (city) => {
    dispatch(Operations.loadCityOffers(city));
  },
  changeBookmark: (id) => {
    dispatch(UserOperations.changeBookmark(id));
  },
  openAuthPopup: () => {
    dispatch(ActionCreator.togglePopup());
  },
});

export { OfferPage };

export default connect(mapStateToProps, mapDispatchToProps)(OfferPage);
/* eslint-enable camelcase*/
