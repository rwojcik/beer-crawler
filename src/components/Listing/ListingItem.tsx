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

interface IPropsFromState {
  data: IBeer[];
  errors: string | undefined;
  loading: boolean;
}

interface IPropsFromDispatch {
  fetchStart: typeof fetchStart;
}

type ListingContainerProps = IPropsFromState & IPropsFromDispatch;

interface IOtherProps {
  children?: (props: ListingContainerProps) => React.ReactNode;
}

export class Listing extends React.Component<
  ListingContainerProps & IOtherProps & WithStyles<typeof styles>
> {
  public componentDidMount() {
    this.props.fetchStart(0);
  }

  public render() {
    const { classes } = this.props;
    return (
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Paper className={classes.paper}>item</Paper>
      </Grid>
    );
  }
}

const StyledListing = withStyles(styles)(Listing);

const mapStateToProps = ({ beers }: IApplicationState) => ({
  data: beers.data,
  errors: beers.errors,
  loading: beers.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchStart: (page: number) => dispatch(fetchStart(page)),
});

export const ListingComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StyledListing);
