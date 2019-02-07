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
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IApplicationState } from "../../store";
import { fetchStart } from "../../store/beer/beerActions";
import { IBeer } from "../../store/beer/beerTypes";

const styles = (theme: Theme) =>
  createStyles({
    card: {
    },
    media: {
      objectFit: "contain",
      maxWidth: "100%",
      maxHeight: 275,
      padding: theme.spacing.unit,
    },
  });

interface IPropsFromDispatch {
  fetchStart: typeof fetchStart;
}

interface IProps {
  item: IBeer;
}

type ListingContainerProps = IProps &
  IPropsFromDispatch &
  WithStyles<typeof styles>;

export class ListingItem extends React.Component<ListingContainerProps> {
  public render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            className={classes.media}
            image={this.props.item.image_url}
            title={this.props.item.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.props.item.name}
            </Typography>
            <Typography component="p">
              {this.props.item.tagline}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Details
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export const StyledListingItem = withStyles(styles)(ListingItem);

const mapStateToProps = ({ beers }: IApplicationState) => ({
  data: beers.data,
  errors: beers.errors,
  loading: beers.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchStart: (page: number) => dispatch(fetchStart(page)),
});

export const ListingItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StyledListingItem);
