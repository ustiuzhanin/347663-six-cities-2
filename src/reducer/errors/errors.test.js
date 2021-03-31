import { reducer, ActionCreator, ActionType } from "./errors";

describe(`reducer works correctly`, () => {
  it(`undefined action doesnt affect the state`, () => {
    expect(reducer(undefined, {})).toEqual({
      errorMessage: {},
    });
  });

  it(`shows error message`, () => {
    expect(
      reducer(
        {
          errorMessage: {},
        },
        { type: `SHOW_ERROR_MESSAGE`, payload: "new error" }
      )
    ).toEqual({
      errorMessage: "new error",
    });
  });
});

describe(`action creators works correctly`, () => {
  it(`showErrorMessage returns correct value`, () => {
    expect(ActionCreator.showErrorMessage("new error")).toEqual({
      type: ActionType.SHOW_ERROR_MESSAGE,
      payload: "new error",
    });
  });
});
