import React from 'react';
import {OfferPage} from './offer-page.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';

/* eslint-disable camelcase*/

const mockOffers = [
  {
    city: {
      name: `Dusseldorf`,
      location: {latitude: 51.225402, longitude: 6.776314, zoom: 13}
    },
    preview_image: `https://htmlacademy-react-2.appspot.com/six-cities/static/hotel/9.jpg`,
    images: [
      `https://htmlacademy-react-2.appspot.com/six-cities/static/hotel/5.jpg`,
      `https://htmlacademy-react-2.appspot.com/six-cities/static/hotel/19.jpg`,
      `https://htmlacademy-react-2.appspot.com/six-cities/static/hotel/1.jpg`,
      `https://htmlacademy-react-2.appspot.com/six-cities/static/hotel/2.jpg`,
      `https://htmlacademy-react-2.appspot.com/six-cities/static/hotel/10.jpg`,
      `https://htmlacademy-react-2.appspot.com/six-cities/static/hotel/13.jpg`,
      `https://htmlacademy-react-2.appspot.com/six-cities/static/hotel/20.jpg`,
      `https://htmlacademy-react-2.appspot.com/six-cities/static/hotel/14.jpg`,
      `https://htmlacademy-react-2.appspot.com/six-cities/static/hotel/4.jpg`,
      `https://htmlacademy-react-2.appspot.com/six-cities/static/hotel/7.jpg`,
      `https://htmlacademy-react-2.appspot.com/six-cities/static/hotel/8.jpg`,
      `https://htmlacademy-react-2.appspot.com/six-cities/static/hotel/9.jpg`,
      `https://htmlacademy-react-2.appspot.com/six-cities/static/hotel/11.jpg`,
      `https://htmlacademy-react-2.appspot.com/six-cities/static/hotel/16.jpg`
    ],
    title: `Canal View Prinsengracht`,
    is_favorite: false,
    is_premium: false,
    rating: 3.1,
    type: `room`,
    bedrooms: 1,
    max_adults: 2,
    price: 101,
    goods: [`Breakfast`, `Laptop friendly workspace`],
    host: {
      id: 25,
      name: `Angelina`,
      is_pro: true,
      avatar_url: `img/avatar-angelina.jpg`
    },
    description: `This is a place for dreamers to reset, reflect, and create. Designed with a 'slow' pace in mind, our hope is that you enjoy every part of your stay; from making local coffee by drip in the morning, choosing the perfect record to put on as the sun sets.`,
    location: {
      latitude: 51.248402000000006,
      longitude: 6.763314,
      zoom: 16
    },
    id: 1
  }
];

test(`OfferPage's Snapshot`, () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <OfferPage match={{params: {id: '2'}}} offers={mockOffers} isAuthorizationRequired={false} />
  );
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
/* eslint-enable camelcase*/
