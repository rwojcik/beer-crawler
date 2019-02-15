import { createAction } from "typesafe-actions";
import { BeersActionTypes, IBeer } from "./beerTypes";

export const fetchStart = createAction(BeersActionTypes.FETCH_START, (resolve) => {
  return (page: number) => resolve({page});
});

export const fetchSuccess = createAction(BeersActionTypes.FETCH_SUCCESS, (resolve) => {
  return (data: IBeer[], page: number) => resolve({data, page});
});

export const fetchError = createAction(BeersActionTypes.FETCH_ERROR, (resolve) => {
  return (message: string) => resolve({message});
});
