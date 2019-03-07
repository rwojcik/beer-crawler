import Grid from "@material-ui/core/Grid";
import React from "react";
import { LoadingItem } from "./LoadingItem";

type ListingProgressProps = {
  loading: boolean;
};

export const ListingProgress: React.FunctionComponent<ListingProgressProps> = ({loading}) => {
  if (loading) {
    return (
      <React.Fragment>
        {[-4, -3, -2, -1].map((id) => (
            <Grid key={id} item xs={12} sm={6} md={4} lg={3}>
              <LoadingItem />
            </Grid>
        ))}
      </React.Fragment>
    );
  }

  return null;
};
