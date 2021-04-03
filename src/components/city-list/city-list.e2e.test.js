import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { CityList } from "./city-list.jsx";

Enzyme.configure({ adapter: new Adapter() });

const mockCity = {
  _id: "6005f36637751d35c8503011",
  name: `Dusseldorf`,
  location: { latitude: 51.225402, longitude: 6.776314, zoom: 13 },
};

describe(`AuthModal component testing`, () => {
  it(`checks if click on city link calls onCityLinkClick`, () => {
    const onCityLinkClick = jest.fn();
    const cityList = shallow(
      <CityList
        activeCity={`Dusseldorf`}
        listOfCities={[mockCity]}
        onCityLinkClick={onCityLinkClick}
        loadCityList={jest.fn()}
      />
    );

    const city = cityList.find(`#Dusseldorf`);

    city.simulate(`click`, {
      preventDefault: () => {},
      currentTarget: { id: "Dusseldorf" },
    });
    expect(onCityLinkClick).toHaveBeenCalledTimes(0);

    city.simulate(`click`, {
      preventDefault: () => {},
      currentTarget: { id: "Paris" },
    });
    expect(onCityLinkClick).toHaveBeenCalledTimes(1);
    expect(onCityLinkClick).toHaveBeenCalledWith("Paris");
  });
});
