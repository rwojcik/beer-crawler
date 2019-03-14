import { createAction } from "typesafe-actions";
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
} from "./beerEntitiesActionTypes";
import { Beer } from "./beerEntitiesTypes";

export const fetchStart = createAction(FETCH_START, (resolve) => {
  return (page: number) => resolve({page});
});

export const fetchSuccess = createAction(FETCH_SUCCESS, (resolve) => {
  return (data: Beer[], page: number) => resolve({data, page});
});

export const fetchError = createAction(FETCH_ERROR, (resolve) => {
  return (message: string) => resolve({message});
});

export const fetchIdStart = createAction(FETCH_ID_START, (resolve) => {
  return (id: number) => resolve({id});
});

export const fetchIdSuccess = createAction(FETCH_ID_SUCCESS, (resolve) => {
  return (data: Beer) => resolve({data});
});

export const fetchIdError = createAction(FETCH_ID_ERROR, (resolve) => {
  return (message: string) => resolve({message});
});

export const fetchRecommendedStart = createAction(FETCH_RECOMMENDED_START, (resolve) => {
  return (id: number, abv: number, ibu: number, ebc: number) => resolve({id, abv, ibu, ebc});
});

export const fetchRecommendedSuccess = createAction(FETCH_RECOMMENDED_SUCCESS, (resolve) => {
  return (id: number, data: Beer[]) => resolve({id, data});
});

export const fetchRecommendedError = createAction(FETCH_RECOMMENDED_ERROR, (resolve) => {
  return (id: number, message: string) => resolve({id, message});
});
