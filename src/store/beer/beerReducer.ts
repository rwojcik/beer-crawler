import { Reducer } from "redux";
import { ITEMS_PER_PAGE } from "../../constants";
import { FETCH_ERROR, FETCH_START, FETCH_SUCCESS } from "./beerActions";
import { BeersActions, IBeersState } from "./beerTypes";

const initialState: IBeersState = {
  data: [],
  errors: undefined,
  loading: false,
  page: 0,
  pages: 1,
};

export const beersReducer: Reducer<IBeersState, BeersActions> = (state = initialState, action: BeersActions) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...state,
        errors: undefined,
        loading: true,
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...state,
        data: [...state.data, ...action.payload.data],
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
