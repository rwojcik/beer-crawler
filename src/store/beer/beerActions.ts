import { action } from "typesafe-actions";
import { BeersActionTypes, IBeer } from "./beerTypes";

export const fetchStart = (page: number) => action(BeersActionTypes.FETCH_START, page);
export const fetchSuccess = (data: IBeer[]) => action(BeersActionTypes.FETCH_SUCCESS, data);
export const fetchError = (message: string) => action(BeersActionTypes.FETCH_ERROR, message);
