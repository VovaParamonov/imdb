/* eslint react/no-array-index-key: "off" */
/* eslint prefer-destructuring: "off" */

import React from "react";
import PropTypes from "prop-types";
import Genre from "./Genre";
import { useGenres } from "../../../hooks";

import "./style.css";

export default function Search(props) {
  const searchSettings = props.searchSettings;
  const setSearchSettings = props.setSearchSettings;

  const [genres, addSelectedGenre, removeSelectedGenre] = useGenres(
    searchSettings,
    setSearchSettings
  );

  function sendActors(e) {
    e.preventDefault();
    setSearchSettings.setActors(
      e.target.getElementsByClassName("input-actors")[0].value
    );
  }

  function genresToggle() {
    const el = document.getElementsByClassName("genres-wrapper")[0];
    el.classList.toggle("hidden");
  }

  return (
    <div className="search-wrapper">
      <form className="search-elem input-wrapper" onSubmit={sendActors}>
        <input
          type="text"
          className="search-elem input-actors"
          placeholder="Actors..."
        />
        <button type="submit" className="search-elem button-search">
          <i className="fas fa-search" />
        </button>
      </form>
      <button
        type="button"
        className="search-elem button-order"
        onClick={setSearchSettings.orderChange}
      >
        <i
          className="fas fa-long-arrow-alt-up"
          style={{ opacity: searchSettings.order === "asc" ? 1 : 0.2 }}
        />
        <i
          className="fas fa-long-arrow-alt-down"
          style={{ opacity: searchSettings.order === "desc" ? 1 : 0.2 }}
        />
      </button>
      <button
        type="button"
        className="search-elem button-sort"
        onClick={setSearchSettings.sortChange}
      >
        <div style={{ opacity: searchSettings.sort === "year" ? 1 : 0.2 }}>
          Year
        </div>
        <div
          style={{ opacity: searchSettings.sort === "imdbRating" ? 1 : 0.2 }}
        >
          Rating
        </div>
      </button>
      <button
        type="button"
        onClick={genresToggle}
        className="search-elem button-genres"
      >
        Genres
      </button>
      <div className="genres-wrapper hidden">
        {genres.map((genre, i) => (
          <Genre
            addSelectedGenre={addSelectedGenre}
            removeSelectedGenre={removeSelectedGenre}
            key={i}
            name={genre}
          />
        ))}
      </div>
    </div>
  );
}

Search.propTypes = {
  setSearchSettings: PropTypes.object,
  searchSettings: PropTypes.object
};

Search.defaultProps = {
  setSearchSettings: {},
  searchSettings: {}
};
