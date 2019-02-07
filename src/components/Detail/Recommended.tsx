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
import { IBeer } from "../../store/beer/beerTypes";

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
  item: IBeer;
}

type RecommendedProps = IProps &
  WithStyles<typeof styles>;

// tslint:disable-next-line:interface-over-type-literal
type RecommendedState = {
  loading: boolean;
  recommended: IBeer[] | null;
};

function getRecommended(item: IBeer) {
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

export class Recommended extends React.Component<RecommendedProps, RecommendedState> {
  public readonly state: RecommendedState = {
    loading: true,
    recommended: null,
  };

  public componentDidMount() {
    getRecommended(this.props.item)
      .then((res: AxiosResponse<IBeer[]>) => {
        this.setState({
          loading: false,
          recommended: res.data.filter((item) => item.id !== this.props.item.id),
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
        });
      });
  }

  public render() {
    if (this.state.loading) {
      return(
        <React.Fragment>
          <Typography variant="h6" className={this.props.classes.title}>
            <Skeleton height={32} width={180} />
          </Typography>
          <Grid container spacing={16}>
            {
              [-3, -2, -1].map((id) => (
                <Grid key={id} item xs={12} sm={6} md={4}>
                  <Paper className={`${this.props.classes.paper} ${this.props.classes.skeleton}`}>
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

    if (this.state.recommended == null || !this.state.recommended.length) { return null; }

    return (
      <React.Fragment>
        <Typography variant="h6" className={this.props.classes.title}>
          You might also like:
        </Typography>
        <Grid container spacing={16}>
          {
            this.state.recommended.map((item) => (
              <Grid key={item.id} item xs={12} sm={6} md={4}>
                <Paper className={this.props.classes.paper}>
                  <img className={this.props.classes.preview} src={item.image_url} />
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

export const StyledRecommended = withStyles(styles)(Recommended);
