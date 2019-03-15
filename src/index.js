/* eslint react/jsx-filename-extension: "off" */

import React from "react";
import { render } from "react-dom";

import "./index.css";

import App from "./Components/App";

render(<App />, document.getElementById("root"));

window.onscroll = () => {
  if (window.pageYOffset > 600) {
    document.getElementsByClassName("upButton")[0].style.visibility = "visible";
  } else {
    document.getElementsByClassName("upButton")[0].style.visibility = "hidden";
  }
};
