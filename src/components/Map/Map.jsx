import React, {Component} from 'react';
import leaflet from 'leaflet';
import PropTypes from 'prop-types';

export class Map extends Component {
  componentDidMount() {
    const city = [52.38333, 4.9];
    const zoom = 12;
    const icon = leaflet.icon({
      iconUrl: `/img/pin.svg`,
      iconSize: [30, 30]
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

    const {cards} = this.props;

    cards.map(({location}) => {
      leaflet.marker(location, {icon}).addTo(map);
    });
  }
  render() {
    return <div id='map' style={{height: `100%`}}></div>;
  }
}

export default Map;

Map.propTypes = {
  cards: PropTypes.arrayOf(
      PropTypes.shape({
        location: PropTypes.array.isRequired
      }).isRequired
  ).isRequired
};
