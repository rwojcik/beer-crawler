import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { IBeer } from "../../store/beer/beerTypes";

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing.unit * 2,
      backgroundColor: theme.palette.grey[200],
      textAlign: "center",
    },
    title: {
      marginTop: theme.spacing.unit * 2,
    },
    foodList: {
      paddingLeft: 0,
      margin: theme.spacing.unit,
    },
    foodItemRoot: {
      display: "list-item",
      listStyleType: "none",
      "&::before": {
        content: "'– '",
      },
    },
  });

type FoodPairingProps = WithStyles<typeof styles> & {
  item: IBeer;
};

export const FoodPairing: React.FunctionComponent<FoodPairingProps> = ({item, classes}) => {
  if (item.food_pairing && item.food_pairing.length) {
    return (
      <React.Fragment>
        <Typography variant="h6" className={classes.title}>
          Best served with:
        </Typography>
        <ul className={classes.foodList}>
          {item.food_pairing.map((food) => (
            <Typography key={food} component="li" variant="body1" classes={{root: classes.foodItemRoot}}>
              {food}
            </Typography>
          ))}
        </ul>

      </React.Fragment>
    );
  }

  return null;
};

export const StyledFoodPairing = withStyles(styles)(FoodPairing);
