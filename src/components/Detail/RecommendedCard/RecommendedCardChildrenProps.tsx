import { WithStyles } from "@material-ui/core";
import { RouteComponentProps } from "react-router";
import { Beer } from "../../../store/beer/beerTypes";
import { RecommendedCardStyles } from "./RecommendedCardStyles";

export type RecommendedCardChildrenProps = {
  itemId: number;
};

export type RecommendedCardStateProps = {
  item: Beer;
};

export type RecommendedCardProps = WithStyles<typeof RecommendedCardStyles> &
  RouteComponentProps &
  RecommendedCardStateProps &
  RecommendedCardChildrenProps;
