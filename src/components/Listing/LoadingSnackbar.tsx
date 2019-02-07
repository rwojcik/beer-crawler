import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core/styles";
import React from "react";

const LoadingSnackbarStyles = (theme: Theme) =>
  createStyles({
    progress: {
      marginRight: theme.spacing.unit,
    },
  });

export const LoadingSnackbar: React.FunctionComponent<WithStyles<typeof LoadingSnackbarStyles>> = ({classes}) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open
      ContentProps={{
        "aria-describedby": "message-id",
      }}
      message={
        <React.Fragment>
          <CircularProgress size={14} className={classes.progress}/>
          <span id="message-id">Loading</span>
        </React.Fragment>
      }
    />
  );
};

export const StyledLoadingSnackbar = withStyles(LoadingSnackbarStyles)(LoadingSnackbar);
