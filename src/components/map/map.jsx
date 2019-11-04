import React, {Component} from 'react';
import {mapSettings} from '../../mocks/map-settings';
import leaflet from 'leaflet';
import PropTypes from 'prop-types';

export default class RenderMap extends Component {
  componentDidMount() {
    const {activeCity} = this.props;
    const city = activeCity.coords;
    const zoom = mapSettings.zoom;
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

    activeCity.offers.map(({location}) => {
      leaflet.marker(location, {icon}).addTo(map);
    });
  }
  render() {
    return <div id='map' style={{height: `100%`}}></div>;
  }
}

RenderMap.propTypes = {
  activeCity: PropTypes.shape({
    coords: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    offers: PropTypes.arrayOf(
        PropTypes.shape({
          location: PropTypes.array.isRequired
        }).isRequired
    ).isRequired
  }).isRequired
};
