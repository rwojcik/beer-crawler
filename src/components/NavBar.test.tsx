import React from "react";
import ReactDOM from "react-dom";
import { NavBar } from "./NavBar";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<NavBar />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders title", () => {
  const div = document.createElement("div");
  ReactDOM.render(<NavBar />, div);
  expect(div.textContent).toContain("BeerCrawler");
  ReactDOM.unmountComponentAtNode(div);
});
