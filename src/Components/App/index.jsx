import React from "react";

import "./style.css";

import Header from "../Header";
import MovieList from "../MovieList";

import useSetSearchSettings from "../../hooks";

export default function App() {
  const [
    order,
    setOrder,
    sort,
    setSort,
    actors,
    setActors,
    selectedGenres,
    setSelectedGenres
  ] = useSetSearchSettings();

  function genresChange(newGenres) {
    setSelectedGenres(newGenres);
  }

  function actorsChange(newActors) {
    setActors(newActors);
  }

  function orderChange() {
    setOrder(order === "asc" ? "desc" : "asc");
  }

  function sortChange() {
    setSort(sort === "imdbRating" ? "year" : "imdbRating");
  }

  return (
    <div>
      <Header
        order={order}
        sort={sort}
        selectedGenres={selectedGenres}
        orderChange={orderChange}
        sortChange={sortChange}
        actorsChange={actorsChange}
        genresChange={genresChange}
      />
      <MovieList
        order={order}
        sort={sort}
        actors={actors}
        selectedGenres={selectedGenres}
      />
      <a href="#top" className="upButton">
        <i className="fas fa-chevron-circle-up" />
      </a>
    </div>
  );
}
