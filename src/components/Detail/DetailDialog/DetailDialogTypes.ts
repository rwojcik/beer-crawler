import { WithStyles } from "@material-ui/core/styles";
import { RouteComponentProps } from "react-router";
import { fetchIdStart } from "../../../store/beer/beerActionCreators";
import { Beer } from "../../../store/beer/beerTypes";
import { DetailDialogStyles } from "./DetailDialogStyles";

export type OwnProps = RouteComponentProps & {
};

export type Props = Partial<OwnProps> & {
  itemId?: number;
  item?: Beer;
  onClose: () => void;
};

export type PropsFromDispatch = {
  fetchIdStart: typeof fetchIdStart;
};

export type DetailDialogProps = Props &
  PropsFromDispatch &
  WithStyles<typeof DetailDialogStyles>;
