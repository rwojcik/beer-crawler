import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React from "react";

export class NavBar extends React.PureComponent {
  public render() {
    return (
      <AppBar position="static">
      <Toolbar>
        <Typography variant="title" color="inherit">
          BeerCrawler
        </Typography>
      </Toolbar>
    </AppBar>
  );
  }
}
