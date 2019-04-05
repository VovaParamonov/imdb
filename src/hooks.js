import { useEffect, useState } from "react";
import request, { getGenres } from "./API";

function useSearchSettings() {
  const [order, setOrder] = useState("desc");
  const [sort, setSort] = useState("imdbRating");
  const [actors, setActors] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);

  const searchSettings = {
    order,
    sort,
    actors,
    selectedGenres
  };

  function orderChange() {
    setOrder(order === "asc" ? "desc" : "asc");
  }

  function sortChange() {
    setSort(sort === "imdbRating" ? "year" : "imdbRating");
  }

  const setSearchSettings = {
    orderChange,
    sortChange,
    setActors,
    setSelectedGenres
  };

  return [searchSettings, setSearchSettings];
}

function useMovies(searchSettings) {
  const [movies, setMovies] = useState([]);
  const [loadedPages, setLoadedPages] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [err, setErr] = useState(false);

  async function getMovies(
    startId = loadedPages * 30,
    { actors, sort, order, selectedGenres } = searchSettings
  ) {
    const newMovies = await request(
      startId,
      actors.replace(", ", ","),
      sort,
      order,
      selectedGenres.join(",")
    ).catch(() => {
      setErr(true);
      return [];
    });

    if (startId === 0) {
      setMovies(newMovies);
      setLoadedPages(1);
    } else {
      setMovies(movies.concat(newMovies));
      setLoadedPages(loadedPages + 1);
    }

    if (newMovies.length === 0) {
      setHasMore(false);
    }
  }

  useEffect(() => {
    getMovies(0, searchSettings).then();
  }, [searchSettings]);

  return [movies, getMovies, hasMore, err];
}

function useGenres(searchSettings, setSearchSettings) {
  const [genres, setGenres] = useState([]);

  async function loadGenres() {
    const loadedGenres = await getGenres();
    setGenres(loadedGenres);
  }

  useEffect(() => {
    loadGenres().then();
  }, []);

  function addSelectedGenre(genreName) {
    setSearchSettings.setSelectedGenres(
      searchSettings.selectedGenres.concat([genreName])
    );
  }

  function removeSelectedGenre(genreName) {
    setSearchSettings.setSelectedGenres(
      searchSettings.selectedGenres.filter(genre => genre !== genreName)
    );
  }

  return [genres, addSelectedGenre, removeSelectedGenre];
}

export { useSearchSettings, useMovies, useGenres };
