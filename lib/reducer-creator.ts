import { ReducerCreatorConfig, ReducerCreatorResult } from "./interfaces";

export const reducerCreator = (
  reducerName: string,
  config: ReducerCreatorConfig
): ReducerCreatorResult => ({
  name: reducerName,
  ...config,
});
