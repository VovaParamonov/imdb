/* eslint react/no-array-index-key: "off" */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Genre from "./Genre";

import { getGenres } from "../../../API";

import "./style.css";

export default function Search(props) {
  const [genres, setGenres] = useState([]);

  async function loadGenres() {
    const loadedGenres = await getGenres();
    setGenres(loadedGenres);
  }

  useEffect(() => {
    loadGenres().then();
  }, []);

  function sendActors(e) {
    e.preventDefault();
    props.actorsChange(
      e.target.getElementsByClassName("input-actors")[0].value
    );
  }

  function addSelectedGenre(genreName) {
    props.genresChange(props.selectedGenres.concat([genreName]));
  }
  function removeSelectedGenre(genreName) {
    props.genresChange(
      props.selectedGenres.filter(genre => genre !== genreName)
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
  orderChange: PropTypes.func,
  sortChange: PropTypes.func,
  order: PropTypes.string,
  sort: PropTypes.string,
  actorsChange: PropTypes.func,
  genresChange: PropTypes.func,
  selectedGenres: PropTypes.array
};

Search.defaultProps = {
  orderChange: () => {
    console.log("Вывана функция по умолчанию");
  },
  sortChange: () => {
    console.log("Вывана функция по умолчанию");
  },
  order: "",
  sort: "",
  actorsChange: () => {
    console.log("Вывана функция по умолчанию");
  },
  genresChange: () => {
    console.log("Вывана функция по умолчанию");
  },
  selectedGenres: []
};
