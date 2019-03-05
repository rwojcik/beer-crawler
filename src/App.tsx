import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "typeface-roboto";
import { ListingContainer as Listing } from "./components/Listing/Listing";
import { NavBar } from "./components/NavBar";

export class App extends Component {
  public render() {
    return (
      <Router>
        <React.Fragment>
          <NavBar/>
          <Listing/>
        </React.Fragment>
      </Router>
    );
  }
}
