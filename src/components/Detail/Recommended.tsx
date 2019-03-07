import { Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { API_ENDPOINT } from "../../constants";
import { Beer } from "../../store/beer/beerTypes";

const styles = (theme: Theme) =>
  createStyles({
    preview: {
      width: "100%",
      maxWidth: 100,
      maxHeight: 100,
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      objectFit: "contain",
    },
    title: {
      paddingTop: theme.spacing.unit * 3,
      paddingBottom: theme.spacing.unit * 3,
    },
    paper: {
      padding: theme.spacing.unit * 2,
    },
    skeleton: {
      textAlign: "center",
    },
  });

interface IProps {
  item: Beer;
}

type RecommendedProps = IProps &
  WithStyles<typeof styles>;

// tslint:disable-next-line:interface-over-type-literal
type RecommendedState = {
  loading: boolean;
  recommended: Beer[] | null;
};

function getRecommended(item: Beer) {
  const tolerance = 0.2;
  const config: AxiosRequestConfig = {
    baseURL: API_ENDPOINT,
    params: {
      page: 1,
      per_page: 4,
      abv_gt: Math.floor((1 - tolerance) * item.abv),
      abv_lt: Math.ceil((1 + tolerance) * item.abv),
      ibu_gt: Math.floor((1 - tolerance) * item.ibu),
      ibu_lt: Math.ceil((1 + tolerance) * item.ibu),
      ebc_gt: Math.floor((1 - tolerance) * item.ebc),
      ebc_lt: Math.ceil((1 + tolerance) * item.ebc),
    },
  };

  return axios.get("/beers", config );
}

export class RecommendedComponent extends React.Component<RecommendedProps, RecommendedState> {
  public readonly state: RecommendedState = {
    loading: true,
    recommended: null,
  };

  public componentDidMount() {
    const { item } = this.props;
    getRecommended(item)
      .then((res: AxiosResponse<Beer[]>) => {
        this.setState({
          loading: false,
          recommended: res.data.filter((resItem) => resItem.id !== item.id),
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
        });
      });
  }

  public render() {
    const { classes } = this.props;
    const { loading, recommended } = this.state;
    if (loading) {
      return(
        <React.Fragment>
          <Typography variant="h6" className={classes.title}>
            <Skeleton height={32} width={180} />
          </Typography>
          <Grid container spacing={16}>
            {
              [-3, -2, -1].map((id) => (
                <Grid key={id} item xs={12} sm={6} md={4}>
                  <Paper className={`${classes.paper} ${classes.skeleton}`}>
                    <Skeleton height={100} width={100} />
                    <Skeleton />
                  </Paper>
                </Grid>
              ))
            }
          </Grid>
        </React.Fragment>
      );
    }

    if (recommended == null || !recommended.length) { return null; }

    return (
      <React.Fragment>
        <Typography variant="h6" className={classes.title}>
          You might also like:
        </Typography>
        <Grid container spacing={16}>
          {
            recommended.map((item) => (
              <Grid key={item.id} item xs={12} sm={6} md={4}>
                <Paper className={classes.paper}>
                  <img className={classes.preview} src={item.image_url} />
                  <Typography variant="h6" align="center">
                    {item.name}
                  </Typography>
                </Paper>
              </Grid>
            ))
          }
        </Grid>
      </React.Fragment>
    );
  }
}

export const Recommended = withStyles(styles)(RecommendedComponent);
