import Movie from "./Model/Movie";

const BASE_URL = "http://dev.bittenred.com:61537/movies";
const GENRES_URL = "http://dev.bittenred.com:61537/genres";

export default function request(
  startId = 0,
  actors = "",
  sort = "",
  order = "",
  genres = ""
) {
  const url = `${BASE_URL}?start=${startId}&actors=${actors}&sort=${sort}&order=${order}&genres=${genres}`;
  return fetch(url)
    .then(result => result.json()) // Dont understand why
    .then(res => {
      return res.movies.map(movie => new Movie(movie));
    })
    .catch(e => {
      console.log("Ошибка загрузки списка фильмов");
      throw e;
    });
}

export function getGenres() {
  return fetch(GENRES_URL)
    .then(result => result.json())
    .then(res => {
      return res.genres;
    })
    .catch(() => {
      console.log("Ошибка загрузки списка жанров");
      return [];
    });
}
