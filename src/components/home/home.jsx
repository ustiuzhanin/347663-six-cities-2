import React from 'react';
import PropTypes from 'prop-types';

import CardList from '../card-list/card-list.jsx';
import RenderMap from '../map/map.jsx';
import CityList from '../city-list/city-list.jsx';

import Header from '../header/header.jsx';

const Home = (props) => {
  const {offersData} = props;

  return (
    <section>
      <div style={{display: `none`}}>
        <svg xmlns='http://www.w3.org/2000/svg'>
          <symbol id='icon-arrow-select' viewBox='0 0 7 4'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z'
            ></path>
          </symbol>
          <symbol id='icon-bookmark' viewBox='0 0 17 18'>
            <path d='M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z'></path>
          </symbol>
          <symbol id='icon-star' viewBox='0 0 13 12'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z'
            ></path>
          </symbol>
        </svg>
      </div>

      <div className='page page--gray page--main'>
        <Header />

        <main className='page__main page__main--index'>
          <h1 className='visually-hidden'>Cities</h1>
          <div className='tabs'>
            <section className='locations container'>
              <ul className='locations__list tabs__list'>
                <CityList offers={offersData} />
              </ul>
            </section>
          </div>
          <div className='cities'>
            <div className='cities__places-container container'>
              <CardList
                offers={offersData}
                // onCardHeaderClick={onCardHeaderClick}
              />

              <div className='cities__right-section'>
                <section className='cities__map map'>
                  <RenderMap />
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

Home.propTypes = {
  offersData: PropTypes.arrayOf(
    PropTypes.shape({
      city: PropTypes.shape({
        location: PropTypes.shape({
          latitude: PropTypes.number.isRequired,
          longitude: PropTypes.number.isRequired,
          zoom: PropTypes.number.isRequired
        }).isRequired
      }).isRequired,

      id: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired
      }).isRequired
    }).isRequired
  ).isRequired
};

export default Home;
