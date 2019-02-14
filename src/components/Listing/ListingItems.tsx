import Grid from "@material-ui/core/Grid";
import React from "react";
import { IBeer } from "../../store/beer/beerTypes";
import { StyledListingItem as ListingItem } from "./ListingItem";

type ListingItemsProps = {
  data?: IBeer[];
};

export const ListingItems: React.FunctionComponent<ListingItemsProps> = ({data}) => {
  if (data && data.length > 0) {
    return (
      <React.Fragment>
        {data.map((beer) => (
          <Grid key={beer.id} item xs={12} sm={6} md={4} lg={3}>
            <ListingItem item={beer} />
          </Grid>
        ))}
      </React.Fragment>
    );
  }

  return null;
};
