import Grid from "@material-ui/core/Grid";
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
import { ErrorSnackbar } from "./ErrorSnackbar";
import { StyledListingItem as ListingItem } from "./ListingItem";
import { LoadingSnackbar } from "./LoadingSnackbar";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing.unit * 2,
      flexGrow: 1,
    },
    container: {
      maxWidth: 1400,
    },
  });

interface IPropsFromState {
  data?: IBeer[];
  errors: string | undefined;
  loading: boolean;
  page: number;
}

interface IPropsFromDispatch {
  fetchStart: typeof fetchStart;
}

type ListingContainerProps = IPropsFromState & IPropsFromDispatch & WithStyles<typeof styles>;

export class ListingComponent extends React.Component<ListingContainerProps> {
  private renderError = () => {
    const onRetry = () => this.props.fetchStart(this.props.page);

    if (this.props.errors) {
      return (
        <ErrorSnackbar
          error={this.props.errors}
          onRetry={onRetry}
        />
      );
    }

    return null;
  }

  private renderProgress = () => {
    if (this.props.loading) {
      return (
        <LoadingSnackbar />
      );
    }

    return null;
  }

  private renderData = () => {
    if (this.props.data && this.props.data.length > 0) {
      return (
        <div className={this.props.classes.root}>
          <Grid container className={this.props.classes.container}>
            <Grid item lg={1} />
            <Grid item md={12} lg={10} >
              <Grid container spacing={16}>
                {this.props.data.map((beer) => (
                  <Grid key={beer.id} item xs={12} sm={6} md={4} lg={3}>
                    <ListingItem item={beer} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </div>
      );
    }
    return null;
  }

  public componentDidMount() {
    if (!this.props.loading) {
      this.props.fetchStart(1);
    }
  }

  public render() {
    return (
      <React.Fragment>
        {this.renderError()}
        {this.renderData()}
        {this.renderProgress()}
      </React.Fragment>
    );
  }
}

const StyledListing = withStyles(styles)(ListingComponent);

const mapStateToProps = ({ beers }: IApplicationState) => ({
  data: beers.data,
  errors: beers.errors,
  loading: beers.loading,
  page: beers.page,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchStart: (page: number) => dispatch(fetchStart(page)),
});

export const ListingContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StyledListing);
