/* eslint no-use-before-define: "off" */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import "./style.css";

import MovieCard from "../MovieCard";
import request from "../../API";

export default function MovieList(props) {
  const [movies, setMovies] = useState([]);
  const [loadedPages, setLoadedPages] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  async function getMovies(
    startId = loadedPages * 30,
    newActors = props.actors,
    newSort = props.sort,
    newOrder = props.order,
    newGenres = props.selectedGenres
  ) {
    const newMovies = await request(
      startId,
      newActors.replace(", ", ","),
      newSort,
      newOrder,
      newGenres.join(",")
    );

    if (startId === 0) {
      // add or set new settings for request
      setMovies(newMovies);
      setLoadedPages(1);
    } else {
      setMovies(movies.concat(newMovies));
      setLoadedPages(loadedPages + 1);
    }

    if (newMovies.length === 0) {
      setHasMore(false);
    }
  }

  useEffect(() => {
    getMovies(
      0,
      props.actors,
      props.sort,
      props.order,
      props.selectedGenres
    ).then();
  }, [props.order, props.sort, props.actors, props.selectedGenres]);

  function loadPage() {
    getMovies().then();
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
      {/* {props.err ? <h1 className="error">Ошибка загрузки</h1> : ""} */}
    </InfiniteScroll>
  );
}

MovieList.propTypes = {
  order: PropTypes.string,
  sort: PropTypes.string,
  actors: PropTypes.string,
  selectedGenres: PropTypes.array
};

MovieList.defaultProps = {
  order: "",
  sort: "",
  actors: "",
  selectedGenres: []
};
