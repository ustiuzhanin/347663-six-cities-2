import React from 'react';
import PropTypes from 'prop-types';

export default function Card(props) {
  const {onCardMouseEnter, onCardMouseLeave, card} = props;
  const {price, rating, name, type} = card;
  return (
    <article
      className='cities__place-card place-card'
      onMouseEnter={() => onCardMouseEnter(props.card)}
      onMouseLeave={onCardMouseLeave}
    >
      <div className='cities__image-wrapper place-card__image-wrapper'>
        <a href='#'>
          <img
            className='place-card__image'
            src='img/room.jpg'
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
            <span style={{width: `${rating}%`}}></span>
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <h2 className='place-card__name'>
          <a href='#'>{name}</a>
        </h2>
        <p className='place-card__type'>{type}</p>
      </div>
    </article>
  );
}

Card.propTypes = {
  card: PropTypes.shape({
    price: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }).isRequired,
  onCardMouseEnter: PropTypes.func.isRequired,
  onCardMouseLeave: PropTypes.func.isRequired
};
