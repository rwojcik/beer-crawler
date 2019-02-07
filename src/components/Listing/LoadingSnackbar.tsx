import { CircularProgress, Snackbar } from "@material-ui/core";
import React from "react";

export const LoadingSnackbar = () => {
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
          <CircularProgress size={14}/>
          <span id="message-id">Loading</span>
        </React.Fragment>
      }
    />
  );
};
