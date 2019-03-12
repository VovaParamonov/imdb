import React from "react";
import PropTypes from "prop-types";

import "./style.css";

export default function Search(props) {
  return (
    <div className="search-wrapper">
      <div className="search-elem input-wrapper">
        <input type="text" className="search-elem input-actors" />
        <button type="submit" className="search-elem button-search">
          <i className="fas fa-search" />
        </button>
      </div>
      <button
        type="button"
        className="search-elem button-order"
        onClick={props.orderChange}
      >
        <i
          className="fas fa-long-arrow-alt-up"
          style={{ opacity: props.order === "asc" ? 1 : 0.2 }}
        />
        <i
          className="fas fa-long-arrow-alt-down"
          style={{ opacity: props.order === "desc" ? 1 : 0.2 }}
        />
      </button>
      <button
        type="button"
        className="search-elem button-sort"
        onClick={props.sortChange}
      >
        <div style={{ opacity: props.sort === "year" ? 1 : 0.2 }}>Year</div>
        <div style={{ opacity: props.sort === "imdbRating" ? 1 : 0.2 }}>
          Rating
        </div>
      </button>
    </div>
  );
}

Search.propTypes = {
  orderChange: PropTypes.func,
  sortChange: PropTypes.func,
  order: PropTypes.string,
  sort: PropTypes.string
};

Search.defaultProps = {
  orderChange: () => {},
  sortChange: () => {},
  order: "",
  sort: ""
};
