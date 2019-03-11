import { createStyles, Theme } from "@material-ui/core/styles";

export const RecommendedStyles = (theme: Theme) => createStyles({
  wrapper: {
    minHeight: 300,
  },
  preview: {
    width: "100%",
    maxWidth: 100,
    maxHeight: 100,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    objectFit: "contain",
  },
  title: {
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
  },
  paper: {
    padding: theme.spacing.unit * 2,
  },
  skeleton: {
    textAlign: "center",
  },
});
