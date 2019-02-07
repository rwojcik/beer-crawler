import { Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { IBeer } from "../../store/beer/beerTypes";

const styles = (theme: Theme) =>
  createStyles({
    title: {
      paddingTop: theme.spacing.unit * 3,
    },
    paper: {
      padding: theme.spacing.unit * 2,
    },
    skeleton: {
      textAlign: "center",
    },
  });

interface IProps {
  item: IBeer;
}

type RecommendedProps = IProps &
  WithStyles<typeof styles>;

// tslint:disable-next-line:interface-over-type-literal
type RecommendedState = {
  loading: boolean;
};

export class Recommended extends React.Component<RecommendedProps, RecommendedState> {
  public readonly state: RecommendedState = {
    loading: true,
  };

  private renderSkeleton(): React.ReactNode {
    if (this.state.loading) {
      return(
        [-3, -2, -1].map((id) => (
          <Grid key={id} item xs={12} sm={6} md={4}>
            <Paper className={`${this.props.classes.paper} ${this.props.classes.skeleton}`}>
              <Skeleton height={100} width={100} />
              <Skeleton />
            </Paper>
          </Grid>
        ))
      );
    }
    return null;
  }

  public render() {
    return (
      <React.Fragment>
        <Typography variant="h6" className={this.props.classes.title}>
          You might also like:
        </Typography>
        <Grid container spacing={16}>
          {this.renderSkeleton()}
        </Grid>
      </React.Fragment>
    );
  }
}

export const StyledRecommended = withStyles(styles)(Recommended);
