export interface IValueUnitPair {
  value: number;
  unit: string;
}

export interface IBeer {
  id: number;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string;
  abv: number;
  ibu: number;
  target_fg: number;
  target_og: number;
  ebc: number;
  srm: number;
  ph: number;
  attenuation_level: number;
  volume: IValueUnitPair;
  boil_volume: IValueUnitPair;
  method: {
    mash_temp: [
      {
        temp: IValueUnitPair,
        duration: number,
      },
    ],
    fermentation: {
      temp: IValueUnitPair,
    }
    twist: any,
  };
  ingredients: any;
  food_pairing: string[];
  brewers_tips: string;
  contributed_by: string;
}

import { ActionType } from "typesafe-actions";
import * as beers from "./beerActionCreators";

export type BeersActions = ActionType<typeof beers>;

export interface IBeersState {
  readonly loading: boolean;
  readonly data: IBeer[];
  readonly errors?: string;
  readonly page: number;
  readonly pages: number;
}
