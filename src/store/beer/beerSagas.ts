import axios, { AxiosRequestConfig } from "axios";
import { all, call, fork, put, takeLeading } from "redux-saga/effects";
import { API_ENDPOINT, ITEMS_PER_PAGE } from "../../constants";
import { fetchError, fetchStart, fetchSuccess } from "./beerActionCreators";
import { BeersActionTypes } from "./beerTypes";

function beersGet(action: ReturnType<typeof fetchStart>) {
  const config: AxiosRequestConfig = {
    baseURL: API_ENDPOINT,
    params: {
      page: action.payload.page,
      per_page: ITEMS_PER_PAGE,
    },
  };

  return axios.get("/beers", config );
}

function* handleFetch(action: ReturnType<typeof fetchStart>) {
  try {
    const res = yield call(beersGet, action);
    yield put(fetchSuccess(res.data, action.payload.page));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.message!));
    } else {
      yield put(fetchError("An unknown error occurred."));
    }
  }
}

function* watchFetchRequest() {
  yield takeLeading(BeersActionTypes.FETCH_START, handleFetch);
}

export function* beersSaga() {
  yield all([fork(watchFetchRequest)]);
}
