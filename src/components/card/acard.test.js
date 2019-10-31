import React from 'react';
import renderer from 'react-test-renderer';
import Card from './card.jsx';

test(`Card's snapshot`, () => {
  const tree = renderer.create(
      <Card
        card={{
          id: 1,
          src: `img`,
          price: `10`,
          rating: `10`,
          name: `Beautiful`,
          type: `Private`
        }}
        cardMouseEnterHandler={jest.fn()}
        onCardHeaderClick={jest.fn()}
        cardMouseLeaveHandler={jest.fn()}
      />
  );

  expect(tree).toMatchSnapshot();
});
