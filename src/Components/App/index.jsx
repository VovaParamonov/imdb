import React, { useState } from "react";

import "./style.css";

import Header from "../Header";
import MovieList from "../MovieList";

import request from "../../API";

export default function App() {
  const [order, setOrder] = useState("asc");
  const [sort, setSort] = useState("imdbRating");
  const [movies, setMovies] = useState([]);
  const [err, setErr] = useState(null);
  const [loadedPages, setLoadedPages] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [actors, setActors] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);

  async function getMovies(
    startId = loadedPages * 30,
    newActors = actors,
    newSort = sort,
    newOrder = order,
    newGenres = selectedGenres
  ) {
    const newMovies = await request(
      startId,
      newActors.replace(", ", ","),
      newSort,
      newOrder,
      newGenres.join(",")
    );

    if (newMovies !== "error") {
      if (startId === 0) {
        // add or set new settings for request
        setOrder(newOrder);
        setSort(newSort);
        setActors(newActors.replace(", ", ","));
        setMovies(newMovies);
        setLoadedPages(1);
        setSelectedGenres(newGenres);
      } else {
        setMovies(movies.concat(newMovies));
        setLoadedPages(loadedPages + 1);
      }
    } else {
      setErr(newMovies);
    }

    if (newMovies.length === 0) {
      setHasMore(false);
    }
  }

  function genresChange(newGenres) {
    getMovies(0, undefined, sort, order, newGenres);
  }

  function actorsChange(newActors) {
    getMovies(0, newActors);
  }

  function orderChange() {
    getMovies(0, undefined, sort, order === "asc" ? "desc" : "asc");
  }

  function sortChange() {
    getMovies(
      0,
      undefined,
      sort === "imdbRating" ? "year" : "imdbRating",
      order
    );
  }

  return (
    <div>
      <Header
        orderChange={orderChange}
        sortChange={sortChange}
        order={order}
        sort={sort}
        actorsChange={actorsChange}
        selectedGenres={selectedGenres}
        genresChange={genresChange}
      />
      <MovieList
        movies={movies}
        getMovies={getMovies}
        err={err}
        hasMore={hasMore}
      />
      <a href="#top" className="upButton">
        <i className="fas fa-chevron-circle-up" />
      </a>
    </div>
  );
}
