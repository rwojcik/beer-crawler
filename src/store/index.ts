import { combineReducers } from "redux";
import { all, fork } from "redux-saga/effects";
import { beersReducer } from "./beer/beerReducer";
import { beersSaga } from "./beer/beerSagas";
import { BeersState } from "./beer/beerTypes";

export interface IApplicationState {
  beers: BeersState;
}

export const rootReducer = combineReducers<IApplicationState>({
  beers: beersReducer,
});

export function* rootSaga() {
  yield all([
    fork(beersSaga),
  ]);
}
