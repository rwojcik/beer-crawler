import Grid from "@material-ui/core/Grid";
import React from "react";
import { IBeer } from "../../store/beer/beerTypes";
import { StyledListingItem as ListingItem } from "./ListingItem";
import { ListingProgress } from "./ListingProgress";

type ListingItemsProps = {
  data?: IBeer[];
  loading: boolean;
};

export const ListingItems: React.FunctionComponent<ListingItemsProps> = ({data, loading}) => {
  if (data && data.length > 0) {
    return (
      <Grid container spacing={16}>
          {data.map((beer) => (
            <Grid key={beer.id} item xs={12} sm={6} md={4} lg={3}>
              <ListingItem item={beer} />
            </Grid>
          ))}
        <ListingProgress
          loading={loading}
        />
      </Grid>
    );
  }

  return null;
};
