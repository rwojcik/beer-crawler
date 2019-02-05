import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IApplicationState } from "../store";
import { fetchStart } from "../store/beer/beerActions";
import { IBeer } from "../store/beer/beerTypes";

interface IPropsFromState {
  data: IBeer[];
  errors: string | undefined;
  loading: boolean;
}

interface IPropsFromDispatch {
  fetchStart: typeof fetchStart;
}

type ListingContainerProps = IPropsFromState & IPropsFromDispatch;

interface IOtherProps {
  children?: (props: ListingContainerProps) => React.ReactNode;
}

export class Listing extends React.Component<ListingContainerProps & IOtherProps> {

  public componentDidMount() {
    this.props.fetchStart(1);
  }

  public render() {
    return (
      <React.Fragment>
        Here should be listing
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ beers }: IApplicationState) => ({
  data: beers.data,
  errors: beers.errors,
  loading: beers.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchStart: (page: number) => dispatch(fetchStart(page))
});

export const ListingComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Listing);
