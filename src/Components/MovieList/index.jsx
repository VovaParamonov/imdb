import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.css";

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
    fetch("http://dev.bittenred.com:61537/movies")
      .then(result => result.json()) // Dont understand why
      .then(
        res => {
          this.setState({
            isLoaded: false,
            movies: res.movies,
            loadedPages: this.state.loadedPages + 1,
            hasMore: true
          });
        },
        error => {
          this.setState({
            err: error,
            isLoaded: true
          });
        }
      );
  }

  loadPage = () => {
    fetch(`http://dev.bittenred.com:61537/movies?start=${this.state.loadedPages * 30}`)
      .then(result => result.json())
      .then(
        res => {
          const hasMore = res.movies.length !== 0;
          this.setState({
            isLoaded: false,
            movies: this.state.movies.concat(res.movies),
            loadedPages: this.state.loadedPages + 1,
            hasMore
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
              <MovieCard
                title={movie.title}
                rating={movie.imdbRating}
                year={movie.year}
                posterurl={movie.posterurl}
                description={movie.storyline}
              />
            </li>
          );
        })}
        {result}
      </InfiniteScroll>
    );
  }
}
