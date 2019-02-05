import React, { Component } from "react";
import "typeface-roboto";
import { ListingComponent } from "./components/Listing";
import { NavBar } from "./components/NavBar";

export class App extends Component {
  public render() {
    return (
      <React.Fragment>
        <NavBar/>
        <ListingComponent/>
      </React.Fragment>
    );
  }
}
