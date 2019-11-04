import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Card from './card.jsx';

Enzyme.configure({adapter: new Adapter()});

describe(`Card component testing`, () => {
  const mockCard = {
    id: 1,
    src: `img`,
    price: `10`,
    rating: `10`,
    name: `Beautiful`,
    type: `Private`
  };

  it(`check the information that gets passed to the callback`, () => {
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

  it(`click on card headers`, () => {
    const clickHandler = jest.fn();
    const home = shallow(
        <Card
          card={mockCard}
          cardMouseEnterHandler={jest.fn()}
          onCardHeaderClick={clickHandler}
          cardMouseLeaveHandler={jest.fn()}
        />
    );

    const header = home.find(`.place-card__name a`);

    header.at(0).simulate(`click`);

    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});
