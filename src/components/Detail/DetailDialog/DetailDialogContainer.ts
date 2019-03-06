
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import compose from "recompose/compose";
import { Dispatch } from "redux";
import { IApplicationState } from "../../../store";
import { fetchIdStart as fetchIdStartActionCreator } from "../../../store/beer/beerActionCreators";
import { DetailDialogComponent } from "./DetailDialogComponent";
import { styles } from "./DetailDialogStyles";
import {
  DetailDialogProps,
  OwnProps,
  Props,
  PropsFromDispatch,
} from "./DetailDialogTypes";

const mapStateToProps = ({beers}: IApplicationState, { history }: OwnProps): Props => {
  const searchParams = new URLSearchParams(history.location.search);
  const itemId = searchParams.has("details") ? parseInt(searchParams.get("details") || "", 10) : undefined;
  return {
    itemId,
    item: itemId ? beers.beers[itemId] : undefined,
    onClose: () => history.push({ search: undefined }),
  };
};

const mapDispatchToProps = (dispatch: Dispatch): PropsFromDispatch => ({
  fetchIdStart: (id: number) => dispatch(fetchIdStartActionCreator(id)),
});

export const DetailDialogContainer = compose<DetailDialogProps, {}>(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(DetailDialogComponent);
