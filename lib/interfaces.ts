export interface ReducerCreatorConfig {
  types: { [type: string]: string };
  state: { [key: string]: any };
  actions: { [action: string]: () => any };
  reducer: { [key: string]: (state: any, action: any) => any };
}

export interface ReducerCreatorResult extends ReducerCreatorConfig {
  name: string;
}

export interface ReduxFastConfig {
  useAsDefaultReducer?: boolean;
}

export interface ReduxFastResult {
  state: { [key: string]: any };
  types: { [x: string]: { [type: string]: any } };
  actions: { [x: string]: { [action: string]: () => any } };
  reducer: (state: any, action: { type: string; payload: any }) => any;
}
