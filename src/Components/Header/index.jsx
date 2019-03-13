import React from "react";
import PropTypes from "prop-types";
import Search from "./Search";

import "./style.css";

export default function Header(props) {
  return (
    <header>
      <h1 className="logo">IMDb</h1>
      <Search
        orderChange={props.orderChange}
        sortChange={props.sortChange}
        order={props.order}
        sort={props.sort}
        actorsChange={props.actorsChange}
      />
    </header>
  );
}

Header.propTypes = {
  orderChange: PropTypes.func,
  sortChange: PropTypes.func,
  order: PropTypes.string,
  sort: PropTypes.string,
  actorsChange: PropTypes.func
};

Header.defaultProps = {
  orderChange: () => {},
  sortChange: () => {},
  order: "",
  sort: "",
  actorsChange: () => {}
};
