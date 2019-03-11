import { Reducer } from "redux";
import { ITEMS_PER_PAGE } from "../../constants";
import {
  FETCH_ERROR,
  FETCH_ID_ERROR,
  FETCH_ID_START,
  FETCH_ID_SUCCESS,
  FETCH_RECOMMENDED_ERROR,
  FETCH_RECOMMENDED_START,
  FETCH_RECOMMENDED_SUCCESS,
  FETCH_START,
  FETCH_SUCCESS,
} from "./beerActionTypes";
import { Beer, BeerEntities, BeersActions, BeersState } from "./beerTypes";

const initialState: BeersState = {
  beers: { },
  listedBeerIds: [],
  errors: undefined,
  errorsId: undefined,
  errorsRecommended: undefined,
  loading: false,
  loadingId: false,
  loadingRecommended: false,
  recommendedIds: [],
  recommenderId: -1,
  page: 0,
  pages: 1,
};

export const beersReducer: Reducer<BeersState, BeersActions> = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...state,
        errors: undefined,
        loading: true,
      };
    }
    case FETCH_SUCCESS: {
      const beers = normalizeAndMerge(action.payload.data, state.beers);
      return {
        ...state,
        beers,
        errors: undefined,
        loading: false,
        page: action.payload.page,
        pages: action.payload.data.length === ITEMS_PER_PAGE ? action.payload.page + 1 : action.payload.page,
        listedBeerIds: [ ...state.listedBeerIds, ...action.payload.data.map((b) => b.id) ],
      };
    }
    case FETCH_ERROR: {
      return {
        ...state,
        errors: action.payload.message,
        loading: false,
      };
    }
    case FETCH_ID_START: {
      return {
        ...state,
        errorsId: undefined,
        loadingId: true,
      };
    }
    case FETCH_ID_SUCCESS: {
      const beerId = action.payload.data.id;
      const beers = { ...state.beers, [beerId]: action.payload.data};
      return {
        ...state,
        beers,
        errorsId: undefined,
        loadingId: false,
      };
    }
    case FETCH_ID_ERROR: {
      return {
        ...state,
        errorsId: action.payload.message,
        loadingId: false,
      };
    }
    case FETCH_RECOMMENDED_START: {
      return {
        ...state,
        errorsRecommended: undefined,
        loadingRecommended: true,
        recommendedIds: [],
        recommenderId: action.payload.id,
      };
    }
    case FETCH_RECOMMENDED_SUCCESS: {
      const {data, id} = action.payload;
      const beers = normalizeAndMerge(data, state.beers);
      return {
        ...state,
        beers,
        recommendedIds: data.map((beer) => beer.id),
        errorsRecommended: undefined,
        loadingRecommended: false,
        recommenderId: id,
      };
    }
    case FETCH_RECOMMENDED_ERROR: {
      return {
        ...state,
        errorsRecommended: action.payload.message,
        loadingRecommended: false,
        recommenderId: action.payload.id,
      };
    }
    default: {
      return state;
    }
  }
};

function normalizeAndMerge(actionBeers: Beer[], stateBeers: BeerEntities) {
  const normalizedBeers = actionBeers.reduce<BeerEntities>((acc, val) => {
    acc[val.id] = val;
    return acc;
  }, {});

  const beers = { ...stateBeers, ...normalizedBeers };
  return beers;
}
