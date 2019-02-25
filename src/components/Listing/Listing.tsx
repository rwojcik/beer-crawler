import Grid from "@material-ui/core/Grid";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IApplicationState } from "../../store";
import { fetchStart as fetchStartActionCreator } from "../../store/beer/beerActionCreators";
import { Beer } from "../../store/beer/beerTypes";
import { ListingError } from "./ListingError";
import { StyledListingFooter as ListingFooter } from "./ListingFooter";
import { ListingItems } from "./ListingItems";
import { ListingProgress } from "./ListingProgress";

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
  beers?: Beer[];
  errors: string | undefined;
  loading: boolean;
  page: number;
  pages: number;
}

interface IPropsFromDispatch {
  fetchStart: typeof fetchStartActionCreator;
}

type ListingContainerProps = IPropsFromState & IPropsFromDispatch & WithStyles<typeof styles>;

export class ListingComponent extends React.Component<ListingContainerProps> {
  private loadMoreItems = () => {
    const { page, pages, fetchStart, loading } = this.props;
    if (!loading && page < pages) {
      fetchStart(page + 1);
    }
  }

  public componentDidMount() {
    const { loading, pages, page, fetchStart } = this.props;
    if (!loading && page < pages) {
      fetchStart(page + 1);
    }
  }

  private retryFetch = () => {
    const { fetchStart, page } = this.props;
    fetchStart(page + 1);
  }

  public render() {
    const { classes, beers, errors, page, pages } = this.props;

    return (
      <div className={classes.root}>
        <Grid container className={classes.container}>
          <Grid item lg={1} />
          <Grid item md={12} lg={10} >
            <InfiniteScroll
              pageStart={0}
              loadMore={this.loadMoreItems}
              hasMore={pages > page}
              initialLoad={false}
            >
              <Grid container spacing={16}>
                <ListingItems
                  beers={beers}
                />
                <ListingProgress
                  loading={pages > page}
                />
                <ListingFooter
                  lastPage={pages === page}
                />
              </Grid>
            </InfiniteScroll>
          </Grid>
        </Grid>
        <ListingError
          errors={errors}
          onRetry={this.retryFetch}
        />
      </div>
    );
  }
}

const StyledListing = withStyles(styles)(ListingComponent);

const mapStateToProps = ({ beers }: IApplicationState): IPropsFromState => ({
  beers: Object.values(beers.beers),
  errors: beers.errors,
  loading: beers.loading,
  page: beers.page,
  pages: beers.pages,
});

const mapDispatchToProps = (dispatch: Dispatch): IPropsFromDispatch => ({
  fetchStart: (page: number) => dispatch(fetchStartActionCreator(page)),
});

export const ListingContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StyledListing);
