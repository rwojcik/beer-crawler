import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core/styles";
import React from "react";
import { ValueUnitPair } from "../../store/beer/beerTypes";

const beerParameterStyles = (theme: Theme) =>
  createStyles({
    root: {
      margin: `${theme.spacing.unit}px ${theme.spacing.unit * 2.5}px ${theme.spacing.unit}px 0`,
    },
  });

type BeerParameterParams = ValueUnitPair & WithStyles<typeof beerParameterStyles> & {
  suffix?: string,
};

export const BeerParameter: React.FunctionComponent<BeerParameterParams> = ({unit, value, suffix, classes}) => (
  <span className={classes.root}>
    <b>{unit}:</b> {value}{suffix}
  </span>
);

export const StyledBeerParameter = withStyles(beerParameterStyles)(BeerParameter);
