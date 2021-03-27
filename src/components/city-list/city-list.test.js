import React from "react";
import { CityList } from "./city-list";
import ShallowRenderer from "react-test-renderer/shallow";

test(`CityList's snapshot`, () => {
  const renderer = new ShallowRenderer();

  const mockCity = {
    _id: "6005f36637751d35c8503011",
    name: `Dusseldorf`,
    location: { latitude: 51.225402, longitude: 6.776314, zoom: 13 },
  };

  renderer.render(
    <CityList
      activeCity={`Amsterdam`}
      listOfCities={[mockCity, mockCity, mockCity]}
      onCityLinkClick={jest.fn()}
      loadCityList={jest.fn()}
    />
  );
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
