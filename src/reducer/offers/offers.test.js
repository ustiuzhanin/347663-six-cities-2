import {reducer, ActionType, ActionCreator} from './offers';

describe(`reducer works correctly`, () => {
  it(`undefined action doesnt affect the state`, () => {
    expect(reducer(undefined, {})).toEqual({
      listOfOffers: []
    });
  });

  it(`add offers to the list`, () => {
    expect(
      reducer(
        {
          listOfOffers: []
        },
        {type: ActionType.ADD_OFFERS, payload: [{}, {}, {}]}
      )
    ).toEqual({
      listOfOffers: [{}, {}, {}]
    });

    expect(
      reducer(
        {
          listOfOffers: []
        },
        {type: ActionType.RESET_OFFERS_LIST}
      )
    ).toEqual({
      listOfOffers: []
    });
  });
});

describe(`action creators works correctly`, () => {
  it(`addActiveCityOffers returns correct value`, () => {
    expect(
      ActionCreator.addActiveCityOffers([{city: `SPB`}, {city: `MSC`}])
    ).toEqual({
      type: ActionType.ADD_OFFERS,
      payload: [{city: `SPB`}, {city: `MSC`}]
    });
  });

  it(`resetOffersList returns correct value`, () => {
    expect(ActionCreator.resetOffersList()).toEqual({
      type: ActionType.RESET_OFFERS_LIST
    });
  });
});
