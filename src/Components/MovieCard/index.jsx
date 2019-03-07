import React from "react";
import PropTypes from "prop-types";

import "./style.css";

export default function MovieCard(props) {
  const backgroundImage = props.movie.posterurl;
  const { title, rating, year, description } = props.movie;

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
MovieCard.propTypes = {
  movie: PropTypes.object
};

MovieCard.defaultProps = {
  movie: {}
};
