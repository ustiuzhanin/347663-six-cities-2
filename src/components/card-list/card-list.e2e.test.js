import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { CardList } from "./card-list.jsx";
import { offer as MockOffer } from "../../mocks/single-offer";

Enzyme.configure({ adapter: new Adapter() });

describe(`CardList component testing`, () => {
  it(`checks if changeSortingType works as expected `, () => {
    const changeSortingType = jest.fn();
    const cardList = shallow(
      <CardList
        activeCity={`Amsterdam`}
        changeSortingType={changeSortingType}
        loadCityOffers={jest.fn()}
        sorting={{ type: "popular", text: "Popular" }}
        cityOffers={[MockOffer]}
      />
    );

    const sortingOption = cardList.find(`#popular`);

    sortingOption.simulate(`click`, {
      target: { id: "popular", innerText: "Popular" },
    });
    expect(changeSortingType).toHaveBeenCalledTimes(0);

    sortingOption.simulate(`click`, {
      target: { id: "price", innerText: "Price" },
    });
    expect(changeSortingType).toHaveBeenCalledTimes(1);
    expect(changeSortingType).toHaveBeenCalledWith({
      type: "price",
      text: "Price",
    });
  });
});
