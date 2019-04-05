import React from "react";
import PropTypes from "prop-types";
import Search from "./Search";

import "./style.css";

export default function Header(props) {
  return (
    <header name="top">
      <h1 className="logo">IMDb</h1>
      <Search
        setSearchSettings={props.setSearchSettings}
        searchSettings={props.searchSettings}
      />
    </header>
  );
}

Header.propTypes = {
  setSearchSettings: PropTypes.object,
  searchSettings: PropTypes.object
};

Header.defaultProps = {
  setSearchSettings: {},
  searchSettings: {}
};
