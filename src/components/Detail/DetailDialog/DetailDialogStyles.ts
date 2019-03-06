import { createStyles, Theme } from "@material-ui/core/styles";

export const styles = (theme: Theme) => createStyles({
  preview: {
    width: "100%",
    maxWidth: 180,
    maxHeight: 450,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    objectFit: "contain",
    [theme.breakpoints.down("sm")]: {
      maxHeight: 250,
    },
  },
  title: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
  },
  dividerRoot: {
    maxWidth: 90,
    height: 5,
    margin: theme.spacing.unit * 2,
    backgroundColor: theme.palette.primary.main,
  },
  parameters: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  subTitle: {
    marginTop: theme.spacing.unit * 2,
  },
});
