import React, { Component } from "react";

import "./style.css";

export default class MovieCard extends Component {
  render() {
    const backgroundImage = this.props.posterurl;
    const { title, rating, year, description } = this.props;

    return (
      <div
        className="MovieCard"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <span className="movieRating">{rating}</span>
        <div className="cardFooter">
          <span className="movieTitle">{title}</span>
          <span className="movieYear">{year}</span>
          <p className="movieDescription">{description}</p>
        </div>
      </div>
    );
  }
}
