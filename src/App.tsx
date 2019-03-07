import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "typeface-roboto";
import { DetailDialog } from "./components/Detail/DetailDialog";
import { ListingView } from "./components/Listing/ListingView";
import { NavBar } from "./components/NavBar";

export class App extends Component {
  public render() {
    return (
      <Router>
        <React.Fragment>
          <NavBar/>
          <ListingView/>
          <DetailDialog />
        </React.Fragment>
      </Router>
    );
  }
}
