import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Slide from "@material-ui/core/Slide";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import Typography from "@material-ui/core/Typography";
import React, { FunctionComponent } from "react";
import { Beer } from "../../store/beer/beerTypes";
import { StyledBeerParameter as BeerParameter } from "./BeerParameter";
import { StyledFoodPairing as FoodPairing } from "./FoodPairing";
import { StyledRecommended as Recommended } from "./Recommended";

const styles = (theme: Theme) =>
  createStyles({
    preview: {
      width: "100%",
      maxWidth: 180,
      maxHeight: 450,
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      objectFit: "contain",
      [theme.breakpoints.down("sm")]: {
        maxHeight: 250,
      },
    },
    title: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "2rem",
      },
    },
    dividerRoot: {
      maxWidth: 90,
      height: 5,
      margin: theme.spacing.unit * 2,
      backgroundColor: theme.palette.primary.main,
    },
    parameters: {
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit * 2,
    },
    subTitle: {
      marginTop: theme.spacing.unit * 2,
    },
  });

interface IProps {
  item: Beer;
  onClose: () => void;
}

type DetailDialogProps = IProps &
  WithStyles<typeof styles>;

const Transition: FunctionComponent<TransitionProps> = (props) => (
  <Slide direction="up" {...props} />
);

export class DetailDialog extends React.Component<DetailDialogProps> {
  public render() {
    const { onClose, classes, item } = this.props;

    return (
      <Dialog
          open
          TransitionComponent={Transition}
          keepMounted
          onClose={onClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          maxWidth="md"
        >
        <DialogContent>
          <Grid container spacing={16}>
            <Grid item xs={12} sm={4}>
              <img className={classes.preview} src={item.image_url} />
            </Grid>
            <Grid item sm={8}>
              <Typography className={classes.title} variant="h3" id="alert-dialog-slide-title">
                {item.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {item.tagline}
              </Typography>
              <Divider
                variant="middle"
                classes={{ root: classes.dividerRoot }}
              />
              <Typography component="p" variant="body1" className={classes.parameters}>
                <BeerParameter unit="IBU" value={item.ibu} />
                <BeerParameter unit="ABV" value={item.abv} suffix="%" />
                <BeerParameter unit="EBC" value={item.ebc} />
              </Typography>
              <DialogContentText id="alert-dialog-slide-description" variant="body1" component="p">
                {item.description}
              </DialogContentText>
              <FoodPairing
                item={item}
              />
              <Typography variant="h6" className={classes.subTitle}>
                Brewer's tips:
              </Typography>
              <DialogContentText variant="body1" component="p">
                {item.brewers_tips}
              </DialogContentText>
            </Grid>
            <Grid item xs={12}>
              <Recommended item={item}/>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  }
}

export const StyledDetailDialog = withStyles(styles)(DetailDialog);
