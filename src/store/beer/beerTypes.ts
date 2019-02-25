export type ValueUnitPair = {
  value: number,
  unit: string,
};

export type Beer = {
  id: number,
  name: string,
  tagline: string,
  first_brewed: string,
  description: string,
  image_url: string,
  abv: number,
  ibu: number,
  target_fg: number,
  target_og: number,
  ebc: number,
  srm: number,
  ph: number,
  attenuation_level: number,
  volume: ValueUnitPair,
  boil_volume: ValueUnitPair,
  method: {
    mash_temp: [
      {
        temp: ValueUnitPair,
        duration: number,
      },
    ],
    fermentation: {
      temp: ValueUnitPair,
    }
    twist: any,
  },
  ingredients: any,
  food_pairing: string[],
  brewers_tips: string,
  contributed_by: string,
};

import { ActionType } from "typesafe-actions";
import * as beers from "./beerActionCreators";

export type BeersActions = ActionType<typeof beers>;

export type BeerEntities = {
  [key: number]: Beer,
};

export type BeersState = {
  readonly loading: boolean,
  readonly beers: BeerEntities,
  readonly errors?: string,
  readonly page: number,
  readonly pages: number,
};
