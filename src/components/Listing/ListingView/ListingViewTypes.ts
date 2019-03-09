import { WithStyles } from "@material-ui/core/styles";
import { fetchStart } from "../../../store/beer/beerActionCreators";
import { Beer } from "../../../store/beer/beerTypes";
import { ListingViewStyles } from "./ListingViewStyles";

export type PropsFromState = {
  beers?: Beer[];
  errors: string | undefined;
  loading: boolean;
  page: number;
  pages: number;
};

export type PropsFromDispatch = {
  fetchStart: typeof fetchStart;
};

export type ListingViewProps = PropsFromState & PropsFromDispatch & WithStyles<typeof ListingViewStyles>;
