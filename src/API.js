import Movie from "./Model/Movie";

const BASE_URL = "http://dev.bittenred.com:61537/movies";

export default function request(
  startId = 0,
  actors = "",
  sort = "",
  order = ""
) {
  const url = `${BASE_URL}?start=${startId}&actors=${actors}&sort=${sort}&order=${order}`;
  return fetch(url)
    .then(result => result.json()) // Dont understand why
    .then(
      res => {
        return res.movies.map(movie => new Movie(movie));
      },
      () => {
        return "error";
      }
    );
}
