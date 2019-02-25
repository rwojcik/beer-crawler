import Grid from "@material-ui/core/Grid";
import React from "react";
import { Beer } from "../../store/beer/beerTypes";
import { StyledListingItem as ListingItem } from "./ListingItem";

type ListingItemsProps = {
  beers?: Beer[];
};

export const ListingItems: React.FunctionComponent<ListingItemsProps> = ({beers}) => {
  if (beers && beers.length > 0) {
    return (
      <React.Fragment>
        {beers.map((beer) => (
          <Grid key={beer.id} item xs={12} sm={6} md={4} lg={3}>
            <ListingItem item={beer} />
          </Grid>
        ))}
      </React.Fragment>
    );
  }

  return null;
};
