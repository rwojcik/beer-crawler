import React, { Component } from "react";
import "typeface-roboto";
import { ListingContainer } from "./components/Listing/Listing";
import { NavBar } from "./components/NavBar";

export class App extends Component {
  public render() {
    return (
      <React.Fragment>
        <NavBar/>
        <ListingContainer/>
      </React.Fragment>
    );
  }
}
