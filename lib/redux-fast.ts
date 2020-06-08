import {
  ReducerCreatorResult,
  ReduxFastConfig,
  ReduxFastResult,
} from "./interfaces";

export const reduxFast = (
  reducerName: string,
  items: ((reducerName: string) => ReducerCreatorResult)[],
  config: ReduxFastConfig
): ReduxFastResult => {
  const { useAsDefaultReducer = false } = config || {};
  let mainReducer: { [type: string]: (state: any, action: any) => any } = {};
  const result: ReduxFastResult = {
    state: {},
    types: {},
    actions: {},
    reducer: () => null,
  };

  items.forEach((item) => {
    const { name, types, actions, state, reducer } = item(reducerName);
    result.state = { ...result.state, ...state };
    result.types = { ...result.types, [name]: types };
    result.actions = { ...result.actions, [name]: actions };
    mainReducer = { ...mainReducer, ...reducer };
  });

  result.reducer = (state: any, action: { type: string }) => {
    if (action.type in mainReducer) {
      return mainReducer[action.type](state, action);
    }
    return useAsDefaultReducer ? result.state : undefined;
  };

  return result;
};
