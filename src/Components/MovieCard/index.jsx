import React, { useState } from "react";
import PropTypes from "prop-types";

import "./style.css";

import defaultImage from "../../img/noposter.jpg";

export default function MovieCard(props) {
  const [backgroundImage, setBackgroundImage] = useState(props.movie.posterurl);
  const { title, rating, year, description } = props.movie;

  return (
    <div className="MovieCard">
      <img
        className="movie-poster"
        src={backgroundImage}
        alt=""
        onError={() => setBackgroundImage(defaultImage)}
      />
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
