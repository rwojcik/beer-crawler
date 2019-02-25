import { Reducer } from "redux";
import { ITEMS_PER_PAGE } from "../../constants";
import { FETCH_ERROR, FETCH_START, FETCH_SUCCESS } from "./beerActions";
import { BeerEntities, BeersActions, BeersState } from "./beerTypes";

const initialState: BeersState = {
  beers: { },
  errors: undefined,
  loading: false,
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
    default: {
      return state;
    }
  }
};
