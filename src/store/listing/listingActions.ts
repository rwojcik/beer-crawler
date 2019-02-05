import { createAction } from "typesafe-actions";

export const get = createAction("listing/GET", (resolve) => {
  return (page: number) => resolve(page);
});
