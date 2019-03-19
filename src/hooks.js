import { useState } from "react";

export default function useSetSearchSettings() {
  const [order, setOrder] = useState("asc");
  const [sort, setSort] = useState("imdbRating");
  const [actors, setActors] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);

  return [
    order,
    setOrder,
    sort,
    setSort,
    actors,
    setActors,
    selectedGenres,
    setSelectedGenres
  ];
}
