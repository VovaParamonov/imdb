import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./style.css";

import request from "../../API";

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
    this.getMovies();
  }

  loadPage = () => {
    this.getMovies(this.state.loadedPages * 30);
  };

  getMovies = async requestData => {
    const movies = await request(requestData);

    if (movies) {
      this.setState(oldState => {
        return {
          isLoaded: false,
          movies: oldState.movies.concat(movies),
          loadedPages: oldState.loadedPages + 1,
          hasMore: true
        };
      });
    } else {
      this.setState(() => {
        this.setState({
          err: "error",
          isLoaded: true,
          hasMore: false
        });
      });
    }
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
              <MovieCard movie={movie} />
            </li>
          );
        })}
        {result}
      </InfiniteScroll>
    );
  }
}
