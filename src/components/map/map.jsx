import React, {Component} from 'react';
import {mapSettings} from '../../mocks/map-settings';

import {connect} from 'react-redux';
import {ActionsCreator} from '../../reducer';
import leaflet from 'leaflet';
import PropTypes from 'prop-types';

class RenderMap extends Component {
  componentDidUpdate() {
    const {listOfOffers} = this.props;

    let container = leaflet.DomUtil.get(`map`);
    if (container !== null) {
      /* eslint-disable camelcase*/
      container._leaflet_id = null;
      /* eslint-enable camelcase*/
    }

    const city = [
      listOfOffers[0].city.location.latitude,
      listOfOffers[0].city.location.longitude
    ];
    const zoom = listOfOffers[0].city.location.zoom;
    const icon = leaflet.icon({
      iconUrl: mapSettings.icon.url,
      iconSize: mapSettings.icon.size
    });

    const map = leaflet.map(`map`, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true
    });
    map.setView(city, zoom);

    leaflet
      .tileLayer(
          `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
          {
            attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
          }
      )
      .addTo(map);

    listOfOffers.map(({location}) => {
      leaflet
        .marker([location.latitude, location.longitude], {icon})
        .addTo(map);
    });
  }

  render() {
    return <div id='map' style={{height: `100%`}}></div>;
  }
}

RenderMap.propTypes = {
  listOfOffers: PropTypes.arrayOf(
      PropTypes.shape({
        city: PropTypes.shape({
          location: PropTypes.shape({
            latitude: PropTypes.number.isRequired,
            longitude: PropTypes.number.isRequired,
            zoom: PropTypes.number.isRequired
          }).isRequired
        }).isRequired,

        id: PropTypes.number.isRequired,
        src: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        rating: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        location: PropTypes.shape({
          latitude: PropTypes.number.isRequired,
          longitude: PropTypes.number.isRequired,
          zoom: PropTypes.number.isRequired
        }).isRequired
      }).isRequired
  ).isRequired
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    listOfOffers: state.listOfOffers
  });

const mapDispatchToProps = (dispatch) => ({
  onCityLinkClick: (activeCityId) => {
    dispatch(ActionsCreator.changeCity(activeCityId));
  },
  createListOfCities: (listOfCities) => {
    dispatch(ActionsCreator.createListOfCities(listOfCities));
  },
  resetOffersList: () => {
    dispatch(ActionsCreator.resetOffersList());
  }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RenderMap);
