import {
  withStyles,
} from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { Dispatch } from "redux";
import { ApplicationState } from "../../../store";
import { fetchRecommendedStart } from "../../../store/beer/beerActionCreators";
import { RecommendedComponent } from "./RecommendedComponent";
import { RecommendedStyles } from "./RecommendedStyles";
import {
  RecommendedChildrenProps,
  RecommendedDispatchProps,
  RecommendedProps,
  RecommendedStateProps,
} from "./RecommendedTypes";

const mapStateToProps = ({beers}: ApplicationState, { itemId }: RecommendedChildrenProps): RecommendedStateProps => {
  return {
    loading: beers.loadingRecommended,
    errors: beers.errorsRecommended,
    item: beers.beers[itemId],
    recommended: beers.recommendedIds.map((recId) => beers.beers[recId]),
    recommenderId: beers.recommenderId,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): RecommendedDispatchProps => ({
  fetchRecommendedStart: (id: number, abv: number, ibu: number, ebc: number) =>
    dispatch(fetchRecommendedStart(id, abv, ibu, ebc)),
});

export const RecommendedContainer = compose<RecommendedProps, RecommendedChildrenProps>(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withStyles(RecommendedStyles),
  )(RecommendedComponent);
