import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import React from "react";

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing.unit * 2,
      backgroundColor: theme.palette.grey[200],
      textAlign: "center",
    },
  });

type ListingFooterProps = WithStyles<typeof styles> & {
  lastPage: boolean;
};

export const ListingFooterComponent: React.FunctionComponent<ListingFooterProps> = ({lastPage, classes}) => {
  if (lastPage) {
    return (
      <Grid item xs={12} >
        <Paper className={classes.paper}>
          There are no more results
        </Paper>
      </Grid>
    );
  }

  return null;
};

export const ListingFooter = withStyles(styles)(ListingFooterComponent);
