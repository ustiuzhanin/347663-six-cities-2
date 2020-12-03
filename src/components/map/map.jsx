import React, { useEffect, useRef } from "react";
import { mapSettings } from "../../mocks/map-settings";
import { connect } from "react-redux";
import { ActionCreator } from "../../reducer/offers-in-radius/offers-in-radius";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import L from "leaflet";
import PropTypes from "prop-types";

const RenderMap = (props) => {
  const {
    listOfOffers,
    activeCard,
    renderCircle,
    currentOffer,
    addOffersInRadius,
    resetOffersInRadius,
  } = props;

  const mapRef = useRef(null);

  const onlickFunc = (id) => console.log("ee");

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

      let circle;
      let offersInRadius = [];

      mapRef.current.eachLayer((layer) => {
        if (layer.options.name === "circle") mapRef.current.removeLayer(layer);
      });

      if (renderCircle) {
        circle = L.circle(
          [currentOffer.location.latitude, currentOffer.location.longitude],
          { radius: 1100, name: "circle" }
        ).addTo(mapRef.current);
        resetOffersInRadius();
      }

      listOfOffers.forEach((offer) => {
        const { location, price, title, id } = offer;
        const marker = L.marker([location.latitude, location.longitude], {
          icon: new L.DivIcon({
            className: "marker",
            html:
              `<button class="marker__link" onclick="onlickFunc(${id})"></button>` +
              `<div class="marker__wrapper">
                <span class="marker__title">${title}</span> 
                <span class="marker__price">€${price}</span>
              </div>`,
          }),
          _id: id,
        });
        marker.addTo(mapRef.current);
        // `<a href="/offer/${id}" class="marker__link" target="_blank"></a>` +

        if (circle) {
          const markerDistance = mapRef.current.distance(
            marker.getLatLng(),
            circle.getLatLng()
          );
          markerDistance <= 1100 ? offersInRadius.push(offer) : null;
        }
      });
      addOffersInRadius(offersInRadius);
    }
  }, [listOfOffers, currentOffer]);

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

const mapDispatchToProps = (dispatch) => ({
  addOffersInRadius: (offers) => {
    dispatch(ActionCreator.addOffersInRadius(offers));
  },
  resetOffersInRadius: () => {
    dispatch(ActionCreator.resetOffersInRadius());
  },
});

export { RenderMap };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RenderMap));
