import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import compose from "recompose/compose";
import { Beer } from "../../store/beer/beerTypes";

const styles = (theme: Theme) =>
  createStyles({
    card: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    cardArea: {
      flexGrow: 1,
    },
    media: {
      objectFit: "contain",
      maxWidth: "100%",
      maxHeight: 275,
      padding: theme.spacing.unit,
    },
  });

type Props = {
  item: Beer;
};

type ListingItemProps = Props &
  WithStyles<typeof styles> &
  RouteComponentProps;

export class ListingItemComponent extends React.Component<ListingItemProps> {
  public shouldComponentUpdate(nextProps: ListingItemProps) {
    return nextProps.item.id !== this.props.item.id;
  }

  private openDetail = () => {
    const { history, item } = this.props;
    history.push({  search: `details=${item.id}` });
  }

  public render() {
    const { classes, item } = this.props;
    return (
      <React.Fragment>
        <Card className={classes.card}>
          <CardActionArea className={classes.cardArea} onClick={this.openDetail}>
            <CardMedia
              component="img"
              className={classes.media}
              image={item.image_url}
              title={item.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {item.name}
              </Typography>
              <Typography component="p">
                {item.tagline}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={this.openDetail}>
              Details
            </Button>
          </CardActions>
        </Card>
      </React.Fragment>
    );
  }
}

export const ListingItem = compose<ListingItemProps, Props>(
  withRouter,
  withStyles(styles),
)(ListingItemComponent);
