import {reducer, ActionType, Operations} from './data';
import createAPI from '../../api';
import MockAdapter from 'axios-mock-adapter';

describe(`reducer works correctly`, () => {
  it(`undefined action doesnt affect the state`, () => {
    expect(reducer(undefined, {})).toEqual({
      data: []
    });
  });

  it(`Should make a correct API call to /questions`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const dataLoader = Operations.loadData();

    apiMock.onGet(`/hotels`).reply(200, [{fake: true}]);

    return dataLoader(dispatch, jest.fn(), api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_DATA,
        payload: [{fake: true}]
      });
    });
  });
});
