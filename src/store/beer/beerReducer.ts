import { Reducer } from "redux";
import { ITEMS_PER_PAGE } from "../../constants";
import {
  FETCH_ERROR,
  FETCH_ID_ERROR,
  FETCH_ID_START,
  FETCH_ID_SUCCESS,
  FETCH_START,
  FETCH_SUCCESS,
} from "./beerActionTypes";
import { BeerEntities, BeersActions, BeersState } from "./beerTypes";

const initialState: BeersState = {
  beers: { },
  errors: undefined,
  loading: false,
  loadingId: false,
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
      const actionBeers = action.payload.data.reduce<BeerEntities>((acc, val) => {
        acc[val.id] = val;
        return acc;
      }, {});
      const beers = { ...state.beers, ...actionBeers};
      return {
        ...state,
        beers,
        errors: undefined,
        loading: false,
        page: action.payload.page,
        pages: action.payload.data.length === ITEMS_PER_PAGE ? action.payload.page + 1 : action.payload.page,
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
        errors: undefined,
        loadingId: true,
      };
    }
    case FETCH_ID_SUCCESS: {
      const beerId = action.payload.data.id;
      const beers = { ...state.beers, [beerId]: action.payload.data};
      return {
        ...state,
        beers,
        errors: undefined,
        loadingId: false,
      };
    }
    case FETCH_ID_ERROR: {
      return {
        ...state,
        errors: action.payload.message,
        loadingId: false,
      };
    }
    default: {
      return state;
    }
  }
};
