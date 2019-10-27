import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from './Home.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`click on card headers`, () => {
  const clickHandler = jest.fn();
  const home = mount(
      <Home
        places={[
          {
            id: 1,
            src: `img`,
            price: `10`,
            rating: `10`,
            name: `Beautiful`,
            type: `Private`
          }
        ]}
        onCardHeaderClick={clickHandler}
      />
  );

  const header = home.find(`.place-card__name a`);

  header.at(0).simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
