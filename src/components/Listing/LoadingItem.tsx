import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import {
  createStyles,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Skeleton from "react-loading-skeleton";

const styles = () =>
  createStyles({
    media: {
      textAlign: "center",
    },
  });

export class LoadingItem extends React.Component<WithStyles<typeof styles>> {
  public render() {
    const { classes } = this.props;
    return (
      <Card>
        <div className={classes.media}>
          <Skeleton width={100} height={275}/>
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            <Skeleton width={200} height={32}/>
          </Typography>
          <Typography component="p">
            <Skeleton width={220} height={26}/>
          </Typography>
        </CardContent>
        <CardActions>
          <span>
            <Skeleton width={60} height={16}/>
          </span>
        </CardActions>
      </Card>
    );
  }
}

export const StyledLoadingItem = withStyles(styles)(LoadingItem);
