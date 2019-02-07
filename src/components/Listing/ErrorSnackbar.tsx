import React, { Component } from "react";
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import { Button } from "@material-ui/core";

interface IProps {
  error: string;
  onRetry: () => void;
}

type ErrorSnackbarProps = IProps;


export class ErrorSnackbar extends Component<ErrorSnackbarProps> {
  public render() {
    return (
      <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.error}</span>}
          action={[
            <Button key="undo" color="secondary" size="small" onClick={this.props.onRetry}>
              RETRY
            </Button>,
          ]}
        />
    );
  }
}
