import { combineReducers } from "redux";
import { listingReducer } from "./listing/listingReducer";

export const rootReducer = combineReducers({
  listingReducer,
});
