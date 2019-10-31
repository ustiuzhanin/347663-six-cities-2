import React from 'react';
import renderer from 'react-test-renderer';
import CardList from './card-list.jsx';

test(`CardList's snapshot`, () => {
  const tree = renderer
    .create(
        <CardList
          cards={[
            {
              id: 1,
              src: `img`,
              price: `10`,
              rating: `10`,
              name: `Beautiful`,
              type: `Private`
            }
          ]}
          onCardHeaderClick={jest.fn()}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
