import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { all, call, fork, put, throttle } from "redux-saga/effects";
import { API_ENDPOINT, ITEMS_PER_PAGE } from "../../constants";
import {
  fetchError,
  fetchIdError,
  fetchIdStart,
  fetchIdSuccess,
  fetchRecommendedError,
  fetchRecommendedStart,
  fetchRecommendedSuccess,
  fetchStart,
  fetchSuccess,
} from "./beerActionCreators";
import { FETCH_ID_START, FETCH_RECOMMENDED_START, FETCH_START } from "./beerDetailActionTypes";
import { Beer } from "./beerDetailTypes";

function beersGet(action: ReturnType<typeof fetchStart>) {
  const config: AxiosRequestConfig = {
    baseURL: API_ENDPOINT,
    params: {
      page: action.payload.page,
      per_page: ITEMS_PER_PAGE,
    },
  };

  return axios.get<Beer[]>("/beers", config );
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

  return axios.get<Beer[]>("/beers", config );
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

function requestBeerRecommended(abv: number, ibu: number, ebc: number, tolerance: number) {
  const config: AxiosRequestConfig = {
    baseURL: API_ENDPOINT,
    params: {
      page: 1,
      per_page: 4,
      abv_gt: Math.floor((1 - tolerance) * abv),
      abv_lt: Math.ceil((1 + tolerance) * abv),
      ibu_gt: Math.floor((1 - tolerance) * ibu),
      ibu_lt: Math.ceil((1 + tolerance) * ibu),
      ebc_gt: Math.floor((1 - tolerance) * ebc),
      ebc_lt: Math.ceil((1 + tolerance) * ebc),
    },
  };

  return axios.get<Beer[]>("/beers", config );
}

function* handleBeerRecommendedFetch(action: ReturnType<typeof fetchRecommendedStart>) {
  const { id, abv, ibu, ebc } = action.payload;
  let data: Beer[] = [];
  let tolerance = 0.2;
  try {
    while (tolerance < 1 && data.length < 4) {
      const res = yield call(requestBeerRecommended, abv, ibu, ebc, tolerance);
      data = res.data;
      tolerance += 0.1;
    }
    const filteredData = data.filter((beer) => beer.id !== id).slice(0, 3);
    yield put(fetchRecommendedSuccess(id, filteredData));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchRecommendedError(id, err.message!));
    } else {
      yield put(fetchRecommendedError(id, "An unknown error occurred."));
    }
  }
}

function* watchFetchRequest() {
  yield throttle(1000, FETCH_START, handleBeersFetch);
  yield throttle(1000, FETCH_ID_START, handleBeerIdFetch);
  yield throttle(1000, FETCH_RECOMMENDED_START, handleBeerRecommendedFetch);
}

export function* beersSaga() {
  yield all([fork(watchFetchRequest)]);
}
