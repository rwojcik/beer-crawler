import { withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { ApplicationState } from "../../../store";
import {
  RecommendedCardChildrenProps,
  RecommendedCardProps,
  RecommendedCardStateProps,
} from "./RecommendedCardChildrenProps";
import { RecommendedCardComponent } from "./RecommendedCardComponent";
import { RecommendedCardStyles } from "./RecommendedCardStyles";

const mapStateToProps = (
  { beers }: ApplicationState,
  { itemId }: RecommendedCardChildrenProps,
): RecommendedCardStateProps => {
  return {
    item: beers.beers[itemId],
  };
};

export const RecommendedCardContainer = compose<RecommendedCardProps, RecommendedCardChildrenProps>(
  connect(mapStateToProps),
  withStyles(RecommendedCardStyles),
  withRouter,
)(RecommendedCardComponent);
