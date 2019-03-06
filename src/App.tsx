import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "typeface-roboto";
import { DetailDialogContainer as DetailDialog } from "./components/Detail/DetailDialog/DetailDialogContainer";
import { ListingContainer as Listing } from "./components/Listing/Listing";
import { NavBar } from "./components/NavBar";

export class App extends Component {
  public render() {
    return (
      <Router>
        <React.Fragment>
          <NavBar/>
          <Listing/>
          <DetailDialog />
        </React.Fragment>
      </Router>
    );
  }
}
