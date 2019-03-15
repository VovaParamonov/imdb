import React from "react";
import PropTypes from "prop-types";

import "./style.css";

export default function Genre(props) {
  function handleChange(e) {
    if (e.target.checked) {
      props.addSelectedGenre(e.target.value);
    } else {
      props.removeSelectedGenre(e.target.value);
    }
  }

  return (
    <div className="genre-wrapper">
      <label htmlFor={`id-${props.name}`}>
        <input
          type="checkbox"
          className={`genre ${props.checked ? "genre-active" : ""}`}
          value={props.name}
          id={`id-${props.name}`}
          onChange={handleChange}
        />
        <span>{props.name}</span>
      </label>
    </div>
  );
}

Genre.propTypes = {
  name: PropTypes.string,
  checked: PropTypes.bool,
  addSelectedGenre: PropTypes.func,
  removeSelectedGenre: PropTypes.func
};

Genre.defaultProps = {
  name: "genre",
  checked: false,
  addSelectedGenre: () => {},
  removeSelectedGenre: () => {}
};
