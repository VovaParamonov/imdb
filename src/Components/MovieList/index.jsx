/* eslint no-use-before-define: "off" */

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import "./style.css";

import MovieCard from "../MovieCard";

export default function MovieList(props) {
  useEffect(() => {
    props.getMovies();
  }, []);

  function loadPage() {
    props.getMovies();
  }

  return (
    <InfiniteScroll
      dataLength={props.movies.length}
      next={loadPage}
      hasMore={props.hasMore}
      loader={<h1 className="info">Данные загружаются...</h1>}
    >
      {props.movies.map(movie => {
        return (
          <li key={movie.id}>
            <MovieCard movie={movie} />
          </li>
        );
      })}
      {props.err ? <h1 className="error">Ошибка загрузки</h1> : ""}
    </InfiniteScroll>
  );
}

MovieList.propTypes = {
  movies: PropTypes.array,
  getMovies: PropTypes.func,
  err: PropTypes.string,
  hasMore: PropTypes.bool
};

MovieList.defaultProps = {
  movies: [],
  getMovies: () => {},
  err: "",
  hasMore: true
};
