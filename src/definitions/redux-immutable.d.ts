
declare module "redux-immutable" {
  import { Reducer, ReducersMapObject } from 'redux';

  function combineReducers<S>(reducers: ReducersMapObject): Reducer<S>;

}
