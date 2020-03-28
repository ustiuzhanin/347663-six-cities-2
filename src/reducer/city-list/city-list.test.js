import {reducer, ActionCreator, ActionType} from './city-list';

describe(`reducer works correctly`, () => {
  it(`undefined action doesnt affect the state`, () => {
    expect(reducer(undefined, {})).toEqual({
      activeCity: 'Amsterdam',
      listOfCities: []
    });
  });

  it(`change active city`, () => {
    expect(
      reducer(
        {
          activeCity: `Amsterdam`,
          listOfCities: []
        },
        {type: `CHANGE_CITY`, payload: `Paris`}
      )
    ).toEqual({
      activeCity: `Paris`,
      listOfCities: []
    });
  });

  it(`creates a list of cities`, () => {
    expect(
      reducer(
        {
          activeCity: `Amsterdam`,
          listOfCities: []
        },
        {type: `CREATE_LIST_OF_CITIES`, payload: [`Paris`, `NYC`, `Moscow`]}
      )
    ).toEqual({
      activeCity: `Amsterdam`,
      listOfCities: [`Paris`, `NYC`, `Moscow`]
    });
  });
});

describe(`action creators works correctly`, () => {
  it(`changeCity returns correct value`, () => {
    expect(ActionCreator.changeCity(`Moscow`)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: `Moscow`
    });
  });

  it(`createListOfCities returns correct value`, () => {
    expect(ActionCreator.createListOfCities([`Moscow`, `Kyiv`])).toEqual({
      type: ActionType.CREATE_LIST_OF_CITIES,
      payload: [`Moscow`, `Kyiv`]
    });
  });
});
