import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { all, call, fork, put, takeLeading, throttle } from "redux-saga/effects";
import { API_ENDPOINT, ITEMS_PER_PAGE } from "../../constants";
import { fetchError, fetchStart, fetchSuccess } from "./beerActionCreators";
import { FETCH_START } from "./beerActions";
import { IBeer } from "./beerTypes";

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
    const res: AxiosResponse<IBeer[]> = yield call(beersGet, action);
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
  yield throttle(1000, FETCH_START, handleFetch);
}

export function* beersSaga() {
  yield all([fork(watchFetchRequest)]);
}
