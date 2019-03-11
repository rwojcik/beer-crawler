import Grid from "@material-ui/core/Grid";
import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import { ListingError } from "../ListingError";
import { ListingFooter } from "../ListingFooter";
import { ListingItems } from "../ListingItems";
import { ListingProgress } from "../ListingProgress";
import { ListingViewProps } from "./ListingViewTypes";

export class ListingViewComponent extends React.Component<ListingViewProps> {
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
          <Grid item md={12} lg={10}>
            <InfiniteScroll pageStart={0} loadMore={this.loadMoreItems} hasMore={pages > page} initialLoad={false}>
              <Grid container spacing={16}>
                <ListingItems beers={beers} />
                <ListingProgress loading={pages > page} />
                <ListingFooter lastPage={pages === page} />
              </Grid>
            </InfiniteScroll>
          </Grid>
        </Grid>
        <ListingError errors={errors} onRetry={this.retryFetch} />
      </div>
    );
  }
}
