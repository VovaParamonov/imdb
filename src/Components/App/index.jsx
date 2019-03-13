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

  async function getMovies(
    startId = loadedPages * 30,
    newActors = actors,
    newSort = sort,
    newOrder = order
  ) {
    const newMovies = await request(startId, newActors, newSort, newOrder);

    if (newMovies !== "error") {
      if (startId === 0) {
        setOrder(newOrder);
        setSort(newSort);
        setActors(newActors);
        setMovies(newMovies);
        setLoadedPages(1);
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

  function actorsChange(newActors) {
    getMovies(0, newActors);
  }

  function orderChange() {
    getMovies(0, "", sort, order === "asc" ? "desc" : "asc");
  }

  function sortChange() {
    getMovies(0, "", sort === "imdbRating" ? "year" : "imdbRating", order);
  }

  return (
    <div>
      <Header
        orderChange={orderChange}
        sortChange={sortChange}
        order={order}
        sort={sort}
        actorsChange={actorsChange}
      />
      <MovieList
        movies={movies}
        getMovies={getMovies}
        err={err}
        hasMore={hasMore}
      />
    </div>
  );
}
