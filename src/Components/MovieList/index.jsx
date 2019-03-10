/* eslint no-use-before-define: "off" */

import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./style.css";

import request from "../../API";

import MovieCard from "../MovieCard";

export default function MovieList() {
  const [err, setErr] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loadedPages, setLoadedPages] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    getMovies();
  }, []);

  function loadPage() {
    getMovies(loadedPages * 30);
  }

  async function getMovies(requestData) {
    const newMovies = await request(requestData);

    if (newMovies !== "error") {
      setMovies(movies.concat(newMovies));
      setLoadedPages(loadedPages + 1);
      setHasMore(true);
    } else {
      setErr(newMovies);
    }

    if (newMovies.length === 0) {
      setHasMore(false);
    }
  }

  return (
    <InfiniteScroll
      dataLength={movies.length}
      next={loadPage}
      hasMore={hasMore}
      loader={<h1 className="info">Данные загружаются...</h1>}
    >
      {movies.map(movie => {
        return (
          <li key={movie.id}>
            <MovieCard movie={movie} />
          </li>
        );
      })}
      {err ? <h1 className="error">Ошибка загрузки</h1> : ""}
    </InfiniteScroll>
  );
}
