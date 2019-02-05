import { Reducer } from "redux";
import { BeersActionTypes, IBeersState } from "./beerTypes";

const initialState: IBeersState = {
  data: [],
  errors: undefined,
  loading: false
};

export const beersReducer: Reducer<IBeersState> = (state = initialState, action) => {
  switch (action.type) {
    case BeersActionTypes.FETCH_START: {
      return {
        ...state,
        loading: true
      };
    }
    case BeersActionTypes.FETCH_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    }
    case BeersActionTypes.FETCH_ERROR: {
      return {
        ...state,
        errors: action.payload,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};
