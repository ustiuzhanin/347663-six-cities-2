import { reducer, ActionCreator, ActionType } from "./active-card";

describe(`reducer works correctly`, () => {
  it(`undefined action doesnt affect the state`, () => {
    expect(reducer(undefined, {})).toEqual({
      activeCard: {},
    });
  });

  it(`change active card`, () => {
    expect(
      reducer(
        {
          activeCard: {},
        },
        { type: `CHANGE_ACTIVE_CARD`, payload: { card: "new card" } }
      )
    ).toEqual({
      activeCard: { card: "new card" },
    });
  });
});

describe(`action creators works correctly`, () => {
  it(`changeActiveCard returns correct value`, () => {
    expect(ActionCreator.changeActiveCard({ card: "new card" })).toEqual({
      type: ActionType.CHANGE_ACTIVE_CARD,
      payload: { card: "new card" },
    });
  });
});
