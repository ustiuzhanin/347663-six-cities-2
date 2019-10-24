import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Card from './Card.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`check the information that gets passed to the callback`, () => {
  const mockCard = {
    id: 1,
    src: `img`,
    price: `10`,
    rating: `10`,
    name: `Beautiful`,
    type: `Private`
  };
  const mouseEnter = jest.fn((cardInfo) => {
    expect(cardInfo).toEqual(mockCard);
  });

  const card = shallow(
      <Card
        card={mockCard}
        cardMouseEnterHandler={mouseEnter}
        onCardHeaderClick={jest.fn()}
        cardMouseLeaveHandler={jest.fn()}
      />
  );

  const activeCard = card.find(`.place-card`);
  activeCard.simulate(`mouseEnter`, {
    card: {
      id: 1,
      src: `img`,
      price: `10`,
      rating: `10`,
      name: `Beautiful`,
      type: `Private`
    }
  });
});