import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { all, call, fork, put, throttle } from "redux-saga/effects";
import { API_ENDPOINT, ITEMS_PER_PAGE } from "../../constants";
import {
  fetchError,
  fetchIdError,
  fetchIdStart,
  fetchIdSuccess,
  fetchStart,
  fetchSuccess,
} from "./beerActionCreators";
import { FETCH_ID_START, FETCH_START } from "./beerActionTypes";
import { Beer } from "./beerTypes";

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

function* handleBeersFetch(action: ReturnType<typeof fetchStart>) {
  try {
    const res: AxiosResponse<Beer[]> = yield call(beersGet, action);
    yield put(fetchSuccess(res.data, action.payload.page));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.message!));
    } else {
      yield put(fetchError("An unknown error occurred."));
    }
  }
}

function beerIdGet(action: ReturnType<typeof fetchIdStart>) {
  const config: AxiosRequestConfig = {
    baseURL: API_ENDPOINT,
    params: {
      ids: action.payload.id,
    },
  };

  return axios.get("/beers", config );
}

function* handleBeerIdFetch(action: ReturnType<typeof fetchIdStart>) {
  try {
    const res: AxiosResponse<Beer[]> = yield call(beerIdGet, action);
    yield put(fetchIdSuccess(res.data[0]));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchIdError(err.message!));
    } else {
      yield put(fetchIdError("An unknown error occurred."));
    }
  }
}

function* watchFetchRequest() {
  yield throttle(1000, FETCH_START, handleBeersFetch);
  yield throttle(1000, FETCH_ID_START, handleBeerIdFetch);
}

export function* beersSaga() {
  yield all([fork(watchFetchRequest)]);
}
