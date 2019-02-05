import { ActionType, getType } from "typesafe-actions";

import * as listingActions from "./listingActions";
export type ListingAction = ActionType<typeof listingActions>;

export const listingReducer = (state = {}, action: ListingAction) => {
  switch (action.type) {
    case getType(listingActions.get):
      return {
        result: action.payload,
      };
    default:
      return state;
  }
};
