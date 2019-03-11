import { Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { RecommendedProps } from "./RecommendedTypes";

export class RecommendedComponent extends React.Component<RecommendedProps> {

  public componentDidMount() {
    const { item, fetchRecommendedStart } = this.props;
    const {id, abv, ibu, ebc} = item;
    fetchRecommendedStart(id, abv, ibu, ebc);
  }

  public render() {
    const { classes, loading, recommended } = this.props;
    if (loading) {
      return (
        <div className={classes.wrapper}>
          <Typography variant="h6" className={classes.title}>
            <Skeleton height={32} width={180} />
          </Typography>
          <Grid container spacing={16}>
            {[-3, -2, -1].map((id) => (<Grid key={id} item xs={12} sm={6} md={4}>
              <Paper className={`${classes.paper} ${classes.skeleton}`}>
                <Skeleton height={100} width={100} />
                <Skeleton />
              </Paper>
            </Grid>))}
          </Grid>
        </div>
      );
    }

    if (recommended == null || !recommended.length) {
      return null;
    }

    return (
      <div className={classes.wrapper}>
        <Typography variant="h6" className={classes.title}>
          You might also like:
          </Typography>
        <Grid container spacing={16}>
          {recommended.map((item) => (<Grid key={item.id} item xs={12} sm={6} md={4}>
            <Paper className={classes.paper}>
              <img className={classes.preview} src={item.image_url} />
              <Typography variant="h6" align="center">
                {item.name}
              </Typography>
            </Paper>
          </Grid>))}
        </Grid>
      </div>
    );
  }
}
