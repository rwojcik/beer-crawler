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
import { IBeer } from "../../store/beer/beerTypes";
import { StyledDetailDialog as DetailDialog } from "../Detail/DetailDialog";

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

interface IProps {
  item: IBeer;
}

type ListingItemProps = IProps &
  WithStyles<typeof styles>;

interface IState {
  showDetail: boolean;
}

type ListingItemState = IState;

export class ListingItem extends React.Component<ListingItemProps, ListingItemState> {
  public readonly state: ListingItemState = {
    showDetail: false,
  };

  private toggleDetail = () => {
    this.setState({
      showDetail: !this.state.showDetail,
    });
  }

  private renderDetail = () => {
    if (this.state.showDetail) {
      return(
        <DetailDialog
          item={this.props.item}
          onClose={this.toggleDetail}
        />
      );
    }
    return null;
  }

  public render() {
    const { classes, item } = this.props;
    return (
      <React.Fragment>
        <Card className={classes.card}>
          <CardActionArea className={classes.cardArea} onClick={this.toggleDetail}>
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
            <Button size="small" color="primary" onClick={this.toggleDetail}>
              Details
            </Button>
          </CardActions>
        </Card>
        {this.renderDetail()}
      </React.Fragment>
    );
  }
}

export const StyledListingItem = withStyles(styles)(ListingItem);
