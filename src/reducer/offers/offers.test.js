import MockAdapter from "axios-mock-adapter";
import qs from "qs";

import { reducer, ActionType, ActionCreator, Operations } from "./offers";
import { testApi as api } from "../../api";

describe(`operations work correctly`, () => {
  const apiMock = new MockAdapter(api);

  it("Should make a get request to /offer/${offerId}", async () => {
    const dispatch = jest.fn();
    const loadOfferGet = Operations.loadOffer("id_123");

    apiMock.onGet(`/offer/id_123`).reply(200, [{ fakeOffer: true }]);

    return loadOfferGet(dispatch, null, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_OFFER,
        payload: [{ fakeOffer: true }],
      });
    });
  });

  it("Should make a get request to /offers + params", async () => {
    const dispatch = jest.fn();
    const offersArr = ["5fee3aaa54b627023d7f94b7"];
    const loadOffersGet = Operations.loadOffers(offersArr);

    apiMock
      .onGet(`/offers`, {
        params: { offers: offersArr },
        paramsSerializer: (params) => {
          return qs.stringify(params);
        },
      })
      .reply(200, [{ fakeOffer: true }]);

    return loadOffersGet(dispatch, null, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_OFFERS,
        payload: [{ fakeOffer: true }],
      });
    });
  });

  it("Should make a get request to /city-offers/${city}", async () => {
    const dispatch = jest.fn();
    const loadCityOffersGet = Operations.loadCityOffers("amsterdam");

    apiMock.onGet(`/city-offers/amsterdam`).reply(200, [{ fakeOffer: true }]);

    return loadCityOffersGet(dispatch, null, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_CITY_OFFERS,
        payload: [{ fakeOffer: true }],
      });
    });
  });
});

describe(`reducer works correctly`, () => {
  it(`undefined action doesnt affect the state`, () => {
    expect(reducer(undefined, {})).toEqual({
      sorting: { type: "popular", text: "Popular" },
      cityOffers: [],
      offers: [],
      offer: null,
    });
  });

  it(`changes sorting type`, () => {
    expect(
      reducer(
        {
          sorting: { type: "popular", text: "Popular" },
        },
        {
          type: ActionType.CHANGE_SORTING,
          payload: { type: "top-rated", text: "Top rated first" },
        }
      )
    ).toEqual({
      sorting: { type: "top-rated", text: "Top rated first" },
    });
  });

  it(`loads a single offer`, () => {
    expect(
      reducer(
        {
          offer: null,
        },
        {
          type: ActionType.LOAD_OFFER,
          payload: { mockOffer: "offer 1" },
        }
      )
    ).toEqual({
      offer: { mockOffer: "offer 1" },
    });
  });

  it(`loads offers`, () => {
    expect(
      reducer(
        {
          offers: [],
        },
        {
          type: ActionType.LOAD_OFFERS,
          payload: [
            { mockOffer: "offer 1" },
            { mockOffer: "offer 2" },
            { mockOffer: "offer 3" },
          ],
        }
      )
    ).toEqual({
      offers: [
        { mockOffer: "offer 1" },
        { mockOffer: "offer 2" },
        { mockOffer: "offer 3" },
      ],
    });
  });

  it(`loads city offers(in radius)`, () => {
    expect(
      reducer(
        {
          cityOffers: [],
        },
        {
          type: ActionType.LOAD_CITY_OFFERS,
          payload: [
            { mockOffer: "offer 1" },
            { mockOffer: "offer 2" },
            { mockOffer: "offer 3" },
          ],
        }
      )
    ).toEqual({
      cityOffers: [
        { mockOffer: "offer 1" },
        { mockOffer: "offer 2" },
        { mockOffer: "offer 3" },
      ],
    });
  });
});

describe(`action creators works correctly`, () => {
  it(`changeSorting returns correct value`, () => {
    expect(
      ActionCreator.changeSorting({
        type: "top-rated",
        text: "Top rated first",
      })
    ).toEqual({
      type: ActionType.CHANGE_SORTING,
      payload: { type: "top-rated", text: "Top rated first" },
    });
  });

  it(`loadOffer returns correct value`, () => {
    expect(ActionCreator.loadOffer({ mockOffer: "offer 1" })).toEqual({
      type: ActionType.LOAD_OFFER,
      payload: { mockOffer: "offer 1" },
    });
  });

  it(`loadOffers returns correct value`, () => {
    expect(
      ActionCreator.loadOffers([
        { mockOffer: "offer 1" },
        { mockOffer: "offer 2" },
      ])
    ).toEqual({
      type: ActionType.LOAD_OFFERS,
      payload: [{ mockOffer: "offer 1" }, { mockOffer: "offer 2" }],
    });
  });

  it(`loadCityOffers returns correct value`, () => {
    expect(
      ActionCreator.loadCityOffers([
        { mockOffer: "offer 1" },
        { mockOffer: "offer 2" },
      ])
    ).toEqual({
      type: ActionType.LOAD_CITY_OFFERS,
      payload: [{ mockOffer: "offer 1" }, { mockOffer: "offer 2" }],
    });
  });

  it(`clearOffers returns correct value`, () => {
    expect(ActionCreator.clearOffers()).toEqual({
      type: ActionType.CLEAR_OFFERS,
    });
  });
});
