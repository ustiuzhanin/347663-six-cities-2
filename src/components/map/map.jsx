import React, { useEffect, useRef } from "react";
import { mapSettings } from "../../mocks/map-settings";

import { connect } from "react-redux";
import L from "leaflet";
import PropTypes from "prop-types";

const ICON = L.icon({
  iconUrl: mapSettings.icon.url,
  iconSize: mapSettings.icon.size,
});
const ACTIVE_ICON = L.icon({
  iconUrl: mapSettings.activeIcon.url,
  iconSize: mapSettings.activeIcon.size,
});

const RenderMap = (props) => {
  const { listOfOffers, activeCard } = props;

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

      listOfOffers.forEach(({ location, price, title, id }) => {
        L.marker([location.latitude, location.longitude], {
          icon: new L.DivIcon({
            className: "marker",
            html:
              `<a href="/offer/${id}" class="marker__link" target="_blank"></a>` +
              `<div class="marker__wrapper">
                <span class="marker__title">${title}</span> 
                <span class="marker__price">€${price}</span>
              </div>`,
          }),
          _id: id,
        }).addTo(mapRef.current);
      });

      const circle = L.circle(
        [listOfOffers[0].location.latitude, listOfOffers[0].location.longitude],
        { radius: 700 }
      ).addTo(mapRef.current);

      const circleBounds = circle.getBounds();

      listOfOffers.forEach(({ location, title, price, id }) => {
        if (
          location.latitude < circleBounds.getNorth() &&
          location.latitude > circleBounds.getSouth() &&
          location.longitude < circleBounds.getEast() &&
          location.longitude > circleBounds.getWest()
        ) {
          console.log(title + " " + price);
        }
      });
    }
  }, [listOfOffers]);

  useEffect(() => {
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        if (layer.options._id === activeCard.id) {
          layer._icon.classList.add("marker--active");
        } else {
          layer._icon.classList.remove("marker--active");
        }
      }
    });
  }, [activeCard]);

  return <div id="map" style={{ height: `100%` }}></div>;
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

export { RenderMap };

export default connect(mapStateToProps, null)(RenderMap);
