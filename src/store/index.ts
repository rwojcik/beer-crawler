import { combineReducers } from "redux";
import { all, fork } from "redux-saga/effects";
import { beersReducer } from "./beer/beerReducer";
import { beersSaga } from "./beer/beerSagas";
import { BeersState } from "./beer/beerTypes";

export type ApplicationState = {
  beerEntities: BeersState;
  beerListing: BeersState;
  beerRecommended: BeersState;
  beerDetail: BeersState;
};

export const rootReducer = combineReducers<ApplicationState>({
  beerEntities: beersReducer,
  beerListing: beersReducer,
  beerRecommended: beersReducer,
  beerDetail: beersReducer,
});

export function* rootSaga() {
  yield all([
    fork(beersSaga),
  ]);
}
