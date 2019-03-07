import {
  withStyles,
} from "@material-ui/core/styles";
import { connect } from "react-redux";
import { compose } from "recompose";
import { Dispatch } from "redux";
import { IApplicationState } from "../../../store";
import { fetchStart as fetchStartActionCreator } from "../../../store/beer/beerActionCreators";
import { ListingViewComponent } from "./ListingViewComponent";
import { ListingViewStyles } from "./ListingViewStyles";
import { ListingViewProps, PropsFromDispatch, PropsFromState } from "./ListingViewTypes";

const mapStateToProps = ({ beers }: IApplicationState): PropsFromState => ({
  beers: Object.values(beers.beers),
  errors: beers.errors,
  loading: beers.loading,
  page: beers.page,
  pages: beers.pages,
});

const mapDispatchToProps = (dispatch: Dispatch): PropsFromDispatch => ({
  fetchStart: (page: number) => dispatch(fetchStartActionCreator(page)),
});

export const ListingViewContainer = compose<ListingViewProps, {}>(
  withStyles(ListingViewStyles),
  connect(mapStateToProps, mapDispatchToProps),
)(ListingViewComponent);
