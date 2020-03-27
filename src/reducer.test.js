import {reducer, ActionsCreator} from './reducer';

describe(`reducer works correctly`, () => {
  it(`undefined action doesnt affect the state`, () => {
    expect(reducer(undefined, {})).toEqual({
      activeCity: `Amsterdam`,
      listOfOffers: [],
      listOfCities: [],
      data: []
    });
  });

  it(`change active city`, () => {
    expect(
      reducer(
        {
          activeCity: `Amsterdam`,
          listOfOffers: [],
          listOfCities: []
        },
        {type: `CHANGE_CITY`, payload: `Paris`}
      )
    ).toEqual({
      activeCity: `Paris`,
      listOfOffers: [],
      listOfCities: []
    });
  });

  it(`creates a list of cities`, () => {
    expect(
      reducer(
        {
          activeCity: `Amsterdam`,
          listOfOffers: [],
          listOfCities: []
        },
        {type: `CREATE_LIST_OF_CITIES`, payload: [`Paris`, `NYC`, `Moscow`]}
      )
    ).toEqual({
      activeCity: `Amsterdam`,
      listOfOffers: [],
      listOfCities: [`Paris`, `NYC`, `Moscow`]
    });
  });

  it(`add offers to the list`, () => {
    expect(
      reducer(
        {
          activeCity: `Amsterdam`,
          listOfOffers: [],
          listOfCities: []
        },
        {type: `ADD_OFFERS`, payload: [{}, {}, {}]}
      )
    ).toEqual({
      activeCity: `Amsterdam`,
      listOfOffers: [{}, {}, {}],
      listOfCities: []
    });

    expect(
      reducer(
        {
          activeCity: `Amsterdam`,
          listOfOffers: [],
          listOfCities: []
        },
        {type: `RESET_OFFERS_LIST`}
      )
    ).toEqual({
      activeCity: `Amsterdam`,
      listOfOffers: [],
      listOfCities: []
    });
  });
});

describe(`action creators works correctly`, () => {
  it(`changeCity returns correct value`, () => {
    expect(ActionsCreator.changeCity(`Moscow`)).toEqual({
      type: `CHANGE_CITY`,
      payload: `Moscow`
    });
  });

  it(`createListOfCities returns correct value`, () => {
    expect(ActionsCreator.createListOfCities([`Moscow`, `Kyiv`])).toEqual({
      type: `CREATE_LIST_OF_CITIES`,
      payload: [`Moscow`, `Kyiv`]
    });
  });

  it(`addActiveCityOffers returns correct value`, () => {
    expect(
      ActionsCreator.addActiveCityOffers([{city: `SPB`}, {city: `MSC`}])
    ).toEqual({
      type: `ADD_OFFERS`,
      payload: [{city: `SPB`}, {city: `MSC`}]
    });
  });

  it(`resetOffersList returns correct value`, () => {
    expect(ActionsCreator.resetOffersList()).toEqual({
      type: `RESET_OFFERS_LIST`
    });
  });
});
