import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable camelcase*/

export default function Card(props) {
  const {
    cardMouseEnterHandler,
    cardMouseLeaveHandler,
    onCardHeaderClick,
    card
  } = props;
  const {price, rating, title, type, preview_image} = card;

  return (
    <article
      className='cities__place-card place-card'
      onMouseEnter={() => cardMouseEnterHandler(props.card)}
      onMouseLeave={cardMouseLeaveHandler}
    >
      <div className='cities__image-wrapper place-card__image-wrapper'>
        <a href='#'>
          <img
            className='place-card__image'
            src={preview_image}
            width='260'
            height='200'
            alt='Place image'
          />
        </a>
      </div>
      <div className='place-card__info'>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>&euro;{price}</b>
            <span className='place-card__price-text'>&#47;&nbsp;night</span>
          </div>
          <button
            className='place-card__bookmark-button place-card__bookmark-button--active button'
            type='button'
          >
            <svg className='place-card__bookmark-icon' width='18' height='19'>
              <use xlinkHref='#icon-bookmark'></use>
            </svg>
            <span className='visually-hidden'>In bookmarks</span>
          </button>
        </div>
        <div className='place-card__rating rating'>
          <div className='place-card__stars rating__stars'>
            <span style={{width: `${(rating / 5) * 100}%`}}></span>
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <h2 className='place-card__name'>
          <a href='#' onClick={onCardHeaderClick}>
            {title}
          </a>
        </h2>
        <p className='place-card__type'>{type}</p>
      </div>
    </article>
  );
}

Card.propTypes = {
  card: PropTypes.shape({
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    preview_image: PropTypes.string.isRequired
  }).isRequired,
  cardMouseEnterHandler: PropTypes.func.isRequired,
  cardMouseLeaveHandler: PropTypes.func.isRequired,
  onCardHeaderClick: PropTypes.func.isRequired
};

/* eslint-enable camelcase*/
