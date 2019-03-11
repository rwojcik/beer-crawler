import { createStyles, Theme } from "@material-ui/core/styles";

export const RecommendedStyles = (theme: Theme) => createStyles({
  wrapper: {
    minHeight: 300,
  },
  title: {
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
  },
  card: {
    textAlign: "center",
  },
});
