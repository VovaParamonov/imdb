export default class Movie {
  constructor(movie) {
    this.id = movie.id;
    this.title = movie.title;
    this.rating = movie.imdbRating;
    this.year = movie.year;
    this.posterurl = movie.posterurl;
    this.description = movie.storyline;
  }

  id = null;

  title = "Unamed";

  rating = 0.0;

  year = 0;

  posterurl = null;

  description = "Description";
}
