import React from 'react';
import Home from '../Home/Home.jsx';

export default function App() {
  const places = [
    `Beautiful & luxurious apartment at great location`,
    `Wood and stone place`,
    `Canal View Prinsengracht`,
    `Nice, cozy, warm big bed apartment`
  ];

  const onCardHeaderClick = () => {
    // TODO: opens the card page/info
  };

  return <Home places={places} onCardHeaderClick={onCardHeaderClick} />;
}
