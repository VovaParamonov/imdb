export default class Movie {
  constructor(movie) {
    this.title = movie.title;
    this.rating = movie.imdbRating;
    this.year = movie.year;
    this.posterurl = movie.posterurl;
    this.description = movie.storyline;
  }
}
