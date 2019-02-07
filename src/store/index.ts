import { combineReducers } from "redux";
import { all, fork } from "redux-saga/effects";
import { beersReducer } from "./beer/beerReducer";
import { beersSaga } from "./beer/beerSagas";
import { IBeersState } from "./beer/beerTypes";

// The top-level state object.
export interface IApplicationState {
  beers: IBeersState;
}

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding IApplicationState property type.
export const rootReducer = combineReducers<IApplicationState>({
  beers: beersReducer,
});

export function* rootSaga() {
  yield all([
    fork(beersSaga),
  ]);
}
