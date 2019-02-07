import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IApplicationState } from "../../store";
import { fetchStart } from "../../store/beer/beerActions";
import { IBeer } from "../../store/beer/beerTypes";
import {
  CircularProgress,
  Typography,
  LinearProgress
} from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing.unit * 2,
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing.unit * 2,
      margin: "auto"
    },
    paperProgress: {
      padding: theme.spacing.unit * 2,
      maxWidth: "500px"
    },
    paperError: {
      padding: theme.spacing.unit * 2,
      maxWidth: "500px"
    }
  });

interface IPropsFromState {
  data?: IBeer[];
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

export class ListingComponent extends React.Component<
  ListingContainerProps & IOtherProps & WithStyles<typeof styles>
> {
  private renderError = () => {
    if (this.props.errors) {
      return (
        <div className={this.props.classes.root}>
          <Paper className={this.props.classes.paperError} elevation={1}>
            <Typography variant="h5" component="h3">
              Error
            </Typography>
            <Typography component="p">{this.props.errors}</Typography>
          </Paper>
        </div>
      );
    }

    return null;
  };

  private renderProgress = () => {
    if (this.props.loading || true) {
      return (
        <div className={this.props.classes.root}>
          <Paper className={this.props.classes.paperProgress} elevation={1}>
            <LinearProgress />
            <Typography variant="h5" component="h3">
              Loading
            </Typography>
            <Typography component="p">Beers data is being loaded</Typography>
          </Paper>
        </div>
      );
    }

    return null;
  };

  private renderData = () => {
    if (this.props.data && this.props.data.length > 0) {
      return (
        <div className={this.props.classes.root}>
          <Grid container spacing={16}>
            {this.props.data.map(beer => (
              <Grid key={beer.id} item xs={12} sm={6} md={4} lg={3}>
                <Paper className={this.props.classes.paper}>item</Paper>
              </Grid>
            ))}
          </Grid>
        </div>
      );
    }
    return null;
  };

  public componentDidMount() {
    this.props.fetchStart(0);
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
  loading: beers.loading
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchStart: (page: number) => dispatch(fetchStart(page))
});

export const ListingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StyledListing);
