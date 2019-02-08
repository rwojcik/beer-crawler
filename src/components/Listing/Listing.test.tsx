import "jest-dom/extend-expect";
import React from "react";
import ReactDOM from "react-dom";
import { render } from "react-testing-library";
import "react-testing-library/cleanup-after-each";
import { ListingComponent } from "./Listing";

// configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  const div = document.createElement("div");

  const errors = undefined;
  const data = undefined;
  const loading = false;
  const page = 1;
  const fetchStart = jest.fn();
  const classes = {
    root: "root",
    container: "container",
  };

  ReactDOM.render(<ListingComponent
    errors = {errors}
    data = {data}
    loading = {loading}
    page = {page}
    fetchStart={fetchStart}
    classes={classes}
  />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("calls loading when should", () => {
  const div = document.createElement("div");

  const errors = undefined;
  const data = undefined;
  const loading = false;
  const page = 1;
  const fetchStart = jest.fn();
  const classes = {
    root: "root",
    container: "container",
  };

  ReactDOM.render(<ListingComponent
    errors = {errors}
    data = {data}
    loading = {loading}
    page = {page}
    fetchStart={fetchStart}
    classes={classes}
  />, div);

  expect(fetchStart.mock.calls.length).toBe(1);
  ReactDOM.unmountComponentAtNode(div);
});

it("calls loading when shouldn't", () => {
  const div = document.createElement("div");
  const errors = undefined;
  const data = undefined;
  const loading = true;
  const page = 1;
  const fetchStart = jest.fn();
  const classes = {
    root: "root",
    container: "container",
  };

  ReactDOM.render(<ListingComponent
    errors = {errors}
    data = {data}
    loading = {loading}
    page = {page}
    fetchStart={fetchStart}
    classes={classes}
  />, div);

  expect(fetchStart.mock.calls.length).toBe(0);
  ReactDOM.unmountComponentAtNode(div);
});
