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

  function orderChange() {
    setOrder(order === "asc" ? "desc" : "asc");
    setMovies([]);
    setLoadedPages(0);
    getMovies(0, '', sort, order === "asc" ? "desc" : "asc");
  }

  function sortChange() {
    setSort(sort === "imdbRating" ? "year" : "imdbRating");
    setMovies([]);
    setLoadedPages(0);
    getMovies(0, sort === "imdbRating" ? "year" : "imdbRating", order);
  }

  async function getMovies(startId = 0, actors = "", newSort=sort, newOrder=order) {
    const newMovies = await request(startId, actors, newSort, newOrder);

    if (newMovies !== "error") {
      setMovies(movies.concat(newMovies));
      setLoadedPages(loadedPages + 1);
    } else {
      setErr(newMovies);
    }

    if (newMovies.length === 0) {
      setHasMore(false);
    }
  }

  return (
    <div>
      <Header
        orderChange={orderChange}
        sortChange={sortChange}
        order={order}
        sort={sort}
      />
      <MovieList
        movies={movies}
        loadedPages={loadedPages}
        getMovies={getMovies}
        err={err}
        hasMore={hasMore}
      />
    </div>
  );
}
