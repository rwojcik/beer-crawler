import { createAction } from "typesafe-actions";
import { FETCH_ERROR, FETCH_START, FETCH_SUCCESS } from "./beerActions";
import { Beer } from "./beerTypes";

export const fetchStart = createAction(FETCH_START, (resolve) => {
  return (page: number) => resolve({page});
});

export const fetchSuccess = createAction(FETCH_SUCCESS, (resolve) => {
  return (data: Beer[], page: number) => resolve({data, page});
});

export const fetchError = createAction(FETCH_ERROR, (resolve) => {
  return (message: string) => resolve({message});
});
