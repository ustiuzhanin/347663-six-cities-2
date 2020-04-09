import React, {useEffect, useRef} from 'react';
import {mapSettings} from '../../mocks/map-settings';

import {connect} from 'react-redux';
import L from 'leaflet';
import PropTypes from 'prop-types';

const ICON = L.icon({
  iconUrl: mapSettings.icon.url,
  iconSize: mapSettings.icon.size,
});
const ACTIVE_ICON = L.icon({
  iconUrl: mapSettings.activeIcon.url,
  iconSize: mapSettings.activeIcon.size,
});

const RenderMap = (props) => {
  const {listOfOffers, activeCard} = props;

  const mapRef = useRef(null);

  useEffect(() => {
    mapRef.current = L.map(`map`, {
      center: mapSettings.defaultCity,
      zoom: mapSettings.defaultZoom,
      zoomControl: false,
      marker: true,
      layers: [
        L.tileLayer(
          `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
          {
            attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
          }
        ),
      ],
    });
  }, []);

  useEffect(() => {
    if (listOfOffers.length > 0) {
      const city = [
        listOfOffers[0].city.location.latitude,
        listOfOffers[0].city.location.longitude,
      ];
      const zoom = listOfOffers[0].city.location.zoom;
      mapRef.current.setView(city, zoom);
    }
  }, [listOfOffers]);

  useEffect(() => {
    listOfOffers.forEach(({location, id}) => {
      L.marker([location.latitude, location.longitude], {
        icon: activeCard.id && activeCard.id === id ? ACTIVE_ICON : ICON,
      }).addTo(mapRef.current);
    });
  }, [activeCard]);

  return <div id='map' style={{height: `100%`}}></div>;
};

RenderMap.propTypes = {
  listOfOffers: PropTypes.arrayOf(
    PropTypes.shape({
      city: PropTypes.shape({
        location: PropTypes.shape({
          latitude: PropTypes.number.isRequired,
          longitude: PropTypes.number.isRequired,
          zoom: PropTypes.number.isRequired,
        }).isRequired,
      }).isRequired,
      id: PropTypes.number.isRequired,
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
  activeCard: PropTypes.shape({
    city: PropTypes.shape({
      location: PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number,
        zoom: PropTypes.number,
      }),
    }),
    id: PropTypes.number,
    location: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      zoom: PropTypes.number,
    }),
  }).isRequired,
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    listOfOffers: state.offers.listOfOffers,
    activeCard: state.activeCard.activeCard,
  });

export {RenderMap};

export default connect(mapStateToProps, null)(RenderMap);
