import {
  withStyles,
} from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IApplicationState } from "../../../store";
import { fetchRecommendedStart } from "../../../store/beer/beerActionCreators";
import { RecommendedComponent } from "./RecommendedComponent";
import { RecommendedStyles } from "./RecommendedStyles";
import { RecommendedChildrenProps, RecommendedDispatchProps, RecommendedStateProps } from "./RecommendedTypes";

const mapStateToProps = ({beers}: IApplicationState, { itemId }: RecommendedChildrenProps): RecommendedStateProps => {
  return {
    loading: beers.loadingRecommended,
    errors: beers.errorsRecommended,
    item: beers.beers[itemId],
    recommended: beers.recommendedIds.map((recId) => beers.beers[recId]),
  };
};

const mapDispatchToProps = (dispatch: Dispatch): RecommendedDispatchProps => ({
  fetchRecommendedStart: (id: number, abv: number, ibu: number, ebc: number) =>
    dispatch(fetchRecommendedStart(id, abv, ibu, ebc)),
});

const connected = connect(mapStateToProps, mapDispatchToProps)(RecommendedComponent);

export const RecommendedContainer = withStyles(RecommendedStyles)(connected);
