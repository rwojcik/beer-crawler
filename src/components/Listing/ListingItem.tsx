import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IApplicationState } from "../../store";
import { fetchStart } from "../../store/beer/beerActions";
import { IBeer } from "../../store/beer/beerTypes";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing.unit * 2,
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      margin: "auto",
    },
  });

interface IPropsFromDispatch {
  fetchStart: typeof fetchStart;
}

interface IProps {
  item: IBeer;
}

type ListingContainerProps = IProps &
  IPropsFromDispatch &
  WithStyles<typeof styles>;

export class ListingItem extends React.Component<ListingContainerProps> {
  public render() {
    const { classes } = this.props;
    return (
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Paper className={classes.paper}>{this.props.item.name}</Paper>
      </Grid>
    );
  }
}

export const StyledListingItem = withStyles(styles)(ListingItem);

const mapStateToProps = ({ beers }: IApplicationState) => ({
  data: beers.data,
  errors: beers.errors,
  loading: beers.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchStart: (page: number) => dispatch(fetchStart(page)),
});

export const ListingItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StyledListingItem);
