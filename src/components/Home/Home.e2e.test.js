import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from './Home.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`click on card headers`, () => {
  const clickHandler = jest.fn();
  const home = shallow(
      <Home places={[`1`, `2`]} onCardHeaderClick={clickHandler} />
  );

  const header = home.find(`.place-card__name a`);

  expect(clickHandler).toHaveBeenCalledTimes(0);

  header.at(0).simulate(`click`);
  header.at(1).simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(2);
});
