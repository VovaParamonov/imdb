/* eslint no-use-before-define: "off" */
/* eslint prefer-destructuring: "off" */

import React from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { useMovies } from "../../hooks";

import "./style.css";

import MovieCard from "../MovieCard";

export default function MovieList(props) {
  const searchSettings = props.searchSettings;

  const [movies, getMovies, hasMore, err] = useMovies(searchSettings);

  return (
    <InfiniteScroll
      dataLength={movies.length}
      next={getMovies}
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

MovieList.propTypes = {
  searchSettings: PropTypes.object
};

MovieList.defaultProps = {
  searchSettings: {}
};
