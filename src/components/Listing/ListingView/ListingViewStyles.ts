import { createStyles, Theme } from "@material-ui/core/styles";

export const ListingViewStyles = (theme: Theme) => createStyles({
  root: {
    padding: theme.spacing.unit * 2,
    flexGrow: 1,
  },
  container: {
    maxWidth: 1400,
  },
});
