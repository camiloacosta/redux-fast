import { Dispatch } from "redux";

import { reducerCreator } from "../reducer-creator";
import { ReducerCreatorResult } from "../interfaces";

export const fetchable = (
  target: string,
  initialState: any,
  service: (...params: any[]) => Promise<any>
) => (reducerName: string): ReducerCreatorResult => {
  const targetLoading = `${target}Loading`;
  const targetError = `${target}Error`;

  const types = {
    LOAD: `${reducerName}/${target}/load`,
    SET_DATA: `${reducerName}/${target}/set-data`,
    SET_ERROR: `${reducerName}/${target}/set-error`,
  };

  const state = {
    [targetLoading]: false,
    [target]: initialState,
    [targetError]: null,
  };

  const actions: { [action: string]: (...params: any[]) => any } = {
    fetch: (...params: any[]) => async (dispatch: Dispatch) => {
      dispatch(actions.load());
      try {
        const data = await service(...params);
        dispatch(actions.setData(data));
      } catch (error) {
        dispatch(actions.setError(error.message));
      }
    },
    load: () => ({ type: types.LOAD }),
    reset: () => ({ type: types.LOAD, payload: initialState }),
    setData: (payload: any): any => ({ type: types.SET_DATA, payload }),
    setError: (payload: any): any => ({ type: types.SET_ERROR, payload }),
  };

  const reducer = {
    [types.LOAD]: (state: any) => ({ ...state, [targetLoading]: true }),
    [types.SET_DATA]: (state: any, { payload }: any) => ({
      ...state,
      [targetLoading]: false,
      [target]: payload,
    }),
    [types.SET_ERROR]: (state: any, { payload }: any) => ({
      ...state,
      [targetLoading]: false,
      [targetError]: payload,
    }),
  };

  return reducerCreator(target, {
    types,
    state,
    actions,
    reducer,
  });
};
