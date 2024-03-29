import React, { useEffect, useRef } from "react";

import { mapSettings } from "../../mocks/map-settings";
import { connect } from "react-redux";
import { ActionCreator } from "../../reducer/offers/offers";

import L from "leaflet";
import PropTypes from "prop-types";

const RenderMap = (props) => {
  const {
    offers,
    activeCard,
    renderCircle,
    currentOffer,
    addOffersInRadius,
    resetOffersInRadius,
  } = props;

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
    if (offers.length > 0) {
      const city = [
        offers[0].city.location.latitude,
        offers[0].city.location.longitude,
      ];
      const zoom = offers[0].city.location.zoom;
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

      offers.forEach((offer) => {
        const { location, price, title, _id } = offer;

        let href;
        if (currentOffer) {
          href = currentOffer._id !== _id ? `href="/offer/${_id}"` : null;
        } else {
          href = `href="/offer/${_id}"`;
        }

        const marker = L.marker([location.latitude, location.longitude], {
          icon: new L.DivIcon({
            className: "marker",
            html:
              `<a ${href} class="marker__link ${
                !href && "marker__link--active"
              }"></a>` +
              `<div class="marker__wrapper">
                <span class="marker__title">${title}</span>
                <span class="marker__price">€${price}</span>
              </div>`,
          }),
          keyboard: false,
          _id,
        });

        marker.addTo(mapRef.current);

        if (circle) {
          const markerDistance = mapRef.current.distance(
            marker.getLatLng(),
            circle.getLatLng()
          );
          return (
            markerDistance <= 1100 &&
            markerDistance !== 0 &&
            offersInRadius.push(offer)
          );
        }
        return null;
      });
      addOffersInRadius(offersInRadius);
    }
  }, [offers, currentOffer]);

  useEffect(() => {
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        if (layer.options._id === activeCard._id) {
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
  renderCircle: PropTypes.bool,
  addOffersInRadius: PropTypes.func.isRequired,
  resetOffersInRadius: PropTypes.func.isRequired,
  currentOffer: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
  }),

  activeCard: PropTypes.shape({
    _id: PropTypes.string,
  }).isRequired,

  offers: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      bedrooms: PropTypes.number.isRequired,
      city: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        location: PropTypes.shape({
          latitude: PropTypes.number.isRequired,
          longitude: PropTypes.number.isRequired,
          zoom: PropTypes.number.isRequired,
        }),
        name: PropTypes.string.isRequired,
      }),
      description: PropTypes.string.isRequired,
      goods: PropTypes.array.isRequired,
      host: PropTypes.string.isRequired,
      images: PropTypes.array.isRequired,
      is_premium: PropTypes.bool.isRequired,
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
      }).isRequired,
      max_adults: PropTypes.number.isRequired,
      preview_image: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    activeCard: state.activeCard.activeCard,
    offers: state.offers.cityOffers,
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

export default connect(mapStateToProps, mapDispatchToProps)(RenderMap);
