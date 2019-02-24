import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./style.css";

import mainRequest from "../../API";
import Movie from "../../Model/Movie";

import MovieCard from "../MovieCard";

export default class MovieList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      err: null,
      isLoaded: true,
      movies: [],
      loadedPages: 0,
      hasMore: false
    };
  }

  componentDidMount() {
    this.request("http://dev.bittenred.com:61537/movies");
  }

  loadPage = () => {
    this.request(
      `http://dev.bittenred.com:61537/movies?start=${this.state.loadedPages *
        30}`
    );
  };

  request = mainRequest;

  render() {
    const { isLoaded, err } = this.state;
    let result = null;
    if (err) {
      result = <h1 className="error">Ошибка загрузки</h1>;
    } else if (isLoaded) {
      result = <h1 className="info">Данные загружаются...</h1>;
    } else {
      result = "";
    }

    return (
      <InfiniteScroll
        dataLength={this.state.movies.length}
        next={this.loadPage}
        hasMore={this.state.hasMore}
        loader={<h1 className="loadInfo">Loading...</h1>}
      >
        {this.state.movies.map(movie => {
          return (
            <li key={movie.id}>
              <MovieCard movie={new Movie(movie)} />
            </li>
          );
        })}
        {result}
      </InfiniteScroll>
    );
  }
}
