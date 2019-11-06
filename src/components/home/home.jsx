import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {ActionsCreator} from '../../reducer';
import CardList from '../card-list/card-list.jsx';
import RenderMap from '../map/map.jsx';

import CityList from '../city-list/city-list.jsx';

class Home extends PureComponent {
  componentDidMount() {
    const {offersData, activeCity} = this.props;
    const activeCityOffers = [];

    offersData.map((offer) => {
      const {city} = offer;

      if (city.name === activeCity) {
        activeCityOffers.push(offer);
      }
    });

    this.props.addActiveCityOffers(activeCityOffers);
  }

  componentDidUpdate(prevProps) {
    const {offersData, activeCity} = this.props;

    if (prevProps.activeCity !== activeCity) {
      let activeCityOffers = [];

      offersData.map((offer) => {
        const {city} = offer;

        if (city.name === activeCity) {
          activeCityOffers = [...activeCityOffers, offer];
        }
      });

      this.props.addActiveCityOffers(activeCityOffers);
    }
  }

  render() {
    const {onCardHeaderClick, activeCity} = this.props;

    return (
      <section>
        <h1>Home Page</h1>
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
          <header className='header'>
            <div className='container'>
              <div className='header__wrapper'>
                <div className='header__left'>
                  <a className='header__logo-link header__logo-link--active'>
                    <img
                      className='header__logo'
                      src='img/logo.svg'
                      alt='6 cities logo'
                      width='81'
                      height='41'
                    />
                  </a>
                </div>
                <nav className='header__nav'>
                  <ul className='header__nav-list'>
                    <li className='header__nav-item user'>
                      <a
                        className='header__nav-link header__nav-link--profile'
                        href='#'
                      >
                        <div className='header__avatar-wrapper user__avatar-wrapper'></div>
                        <span className='header__user-name user__name'>
                          Oliver.conner@gmail.com
                        </span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </header>

          <main className='page__main page__main--index'>
            <h1 className='visually-hidden'>Cities</h1>
            <div className='tabs'>
              <section className='locations container'>
                <ul className='locations__list tabs__list'>
                  <CityList offers={this.props.offersData} />
                </ul>
              </section>
            </div>
            <div className='cities'>
              <div className='cities__places-container container'>
                <section className='cities__places places'>
                  <h2 className='visually-hidden'>Places</h2>
                  <b className='places__found'>
                    312 places to stay in Amsterdam
                  </b>
                  <form className='places__sorting' action='#' method='get'>
                    <span className='places__sorting-caption'>Sort by</span>
                    <span className='places__sorting-type' tabIndex='0'>
                      Popular
                      <svg
                        className='places__sorting-arrow'
                        width='7'
                        height='4'
                      >
                        <use xlinkHref='#icon-arrow-select'></use>
                      </svg>
                    </span>
                    <ul className='places__options places__options--custom places__options--opened'>
                      <li
                        className='places__option places__option--active'
                        tabIndex='0'
                      >
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

                    {/* <select className="places__sorting-type" id="places-sorting">
                    <option className="places__option" value="popular" selected="">Popular</option>
                    <option className="places__option" value="to-high">Price: low to high</option>
                    <option className="places__option" value="to-low">Price: high to low</option>
                    <option className="places__option" value="top-rated">Top rated first</option>
                  </select> */}
                  </form>
                  <div className='cities__places-list places__list tabs__content'>
                    <CardList
                      cards={this.props.listOfOffers}
                      onCardHeaderClick={onCardHeaderClick}
                    />
                  </div>
                </section>
                <div className='cities__right-section'>
                  <section className='cities__map map'>
                    {/* <RenderMap activeCity={offersData[0]} /> */}
                  </section>
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
    );
  }
}

Home.defaultProps = {
  onCardHeaderClick: () => {
    // TODO: prints an error if onClick wasn't passed
  }
};

Home.propTypes = {
  offersData: PropTypes.arrayOf(
      PropTypes.shape({
        coords: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
        offers: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.number.isRequired,
              src: PropTypes.string.isRequired,
              price: PropTypes.string.isRequired,
              rating: PropTypes.string.isRequired,
              name: PropTypes.string.isRequired,
              type: PropTypes.string.isRequired,
              location: PropTypes.array.isRequired
            }).isRequired
        ).isRequired
      }).isRequired
  ).isRequired,
  onCardHeaderClick: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    activeCity: state.activeCity,
    listOfOffers: state.listOfOffers,
    listOfCities: state.listOfCities
  });

const mapDispatchToProps = (dispatch) => ({
  addActiveCityOffers: (activeOffers) => {
    dispatch(ActionsCreator.addActiveCityOffers(activeOffers));
  }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
