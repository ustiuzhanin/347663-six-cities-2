import MockAdapter from "axios-mock-adapter";

import { reducer, ActionCreator, ActionType, Operations } from "./city-list";
import { testApi as api } from "../../api";
describe(`reducer works correctly`, () => {
  it("Should make a correct API call to /cities", async () => {
    const dispatch = jest.fn();
    const apiMock = new MockAdapter(api);
    const cityListLoader = Operations.loadCityList();

    apiMock.onGet("/cities").reply(200, [{ fake: true }]);

    return cityListLoader(dispatch, null, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.CREATE_LIST_OF_CITIES,
        payload: [{ fake: true }],
      });
    });
  });

  it(`undefined action doesnt affect the state`, () => {
    expect(reducer(undefined, {})).toEqual({
      activeCity: "Amsterdam",
      listOfCities: [],
    });
  });

  it(`change active city`, () => {
    expect(
      reducer(
        {
          activeCity: `Amsterdam`,
          listOfCities: [],
        },
        { type: `CHANGE_CITY`, payload: `Paris` }
      )
    ).toEqual({
      activeCity: `Paris`,
      listOfCities: [],
    });
  });

  it(`creates a list of cities`, () => {
    expect(
      reducer(
        {
          activeCity: `Amsterdam`,
          listOfCities: [],
        },
        { type: `CREATE_LIST_OF_CITIES`, payload: [`Paris`, `NYC`, `Moscow`] }
      )
    ).toEqual({
      activeCity: `Amsterdam`,
      listOfCities: [`Paris`, `NYC`, `Moscow`],
    });
  });
});

describe(`action creators works correctly`, () => {
  it(`changeCity returns correct value`, () => {
    expect(ActionCreator.changeCity(`Moscow`)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: `Moscow`,
    });
  });

  it(`createListOfCities returns correct value`, () => {
    expect(ActionCreator.loadCityList([`Moscow`, `Kyiv`])).toEqual({
      type: ActionType.CREATE_LIST_OF_CITIES,
      payload: [`Moscow`, `Kyiv`],
    });
  });
});
