import axios, { AxiosRequestConfig } from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { fetchError, fetchStart, fetchSuccess } from "./beerActions";
import { BeersActionTypes } from "./beerTypes";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || "https://api.punkapi.com/v2/";

// Here we use `redux-saga` to trigger actions asynchronously. `redux-saga` uses something called a
// "generator function", which you can read about here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*

function beersGet(action: ReturnType<typeof fetchStart>) {
  const config: AxiosRequestConfig = {
    baseURL: API_ENDPOINT,
    params: {
      page: action.payload,
      per_page: 20,
    },
  };

  return axios.get("/beers", config );
}

function* handleFetch(action: ReturnType<typeof fetchStart>) {
  try {
    // To call async functions, use redux-saga's `call()`.
    const res = yield call(beersGet, action);

    if (res.error) {
      yield put(fetchError(res.error));
    } else {
      yield put(fetchSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack!));
    } else {
      yield put(fetchError("An unknown error occurred."));
    }
  }
}

// watch Redux for a specific action type, and run saga
function* watchFetchRequest() {
  yield takeEvery(BeersActionTypes.FETCH_START, handleFetch);
}

export function* beersSaga() {
  yield all([fork(watchFetchRequest)]);
}
