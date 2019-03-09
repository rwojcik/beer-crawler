import { WithStyles } from "@material-ui/core/styles";
import { fetchRecommendedStart } from "../../../store/beer/beerActionCreators";
import { Beer } from "../../../store/beer/beerTypes";
import { RecommendedStyles } from "./RecommendedStyles";

export type RecommendedChildrenProps = {
  itemId: number;
};

export type RecommendedStateProps = {
  recommended?: Beer[];
  errors?: string;
  loading: boolean;
  item: Beer;
};

export type RecommendedDispatchProps = {
  fetchRecommendedStart: typeof fetchRecommendedStart;
};

export type RecommendedProps = RecommendedChildrenProps &
  RecommendedStateProps &
  RecommendedDispatchProps &
  WithStyles<typeof RecommendedStyles>;
