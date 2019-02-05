import { combineReducers } from "redux";
import { beersReducer } from "./beer/beerReducer";

export const rootReducer = combineReducers({
  beersReducer,
});
