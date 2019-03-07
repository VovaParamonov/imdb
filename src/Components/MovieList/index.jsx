import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./style.css";

import request from "../../API";

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

  async componentDidMount() {
    request().then(
      res => {
        this.setState(oldState => {
          return {
            isLoaded: false,
            movies: oldState.movies.concat(res.movies),
            loadedPages: oldState.loadedPages + 1,
            hasMore: true
          };
        });
      },
      error => {
        this.setState({
          err: error,
          isLoaded: true,
          hasMore: false
        });
      }
    );
  }

  loadPage = () => {
    request(this.state.loadedPages * 30).then(
      res => {
        this.setState(oldState => {
          return {
            isLoaded: false,
            movies: oldState.movies.concat(res.movies),
            loadedPages: oldState.loadedPages + 1,
            hasMore: true
          };
        });
      },
      error => {
        this.setState({
          err: error,
          isLoaded: true,
          hasMore: false
        });
      }
    );
  };

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
