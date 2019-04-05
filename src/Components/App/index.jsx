import React from "react";

import "./style.css";

import Header from "../Header";
import MovieList from "../MovieList";

import { useSearchSettings } from "../../hooks";

export default function App() {
  const [searchSettings, setSearchSettings] = useSearchSettings();

  return (
    <div>
      <Header
        searchSettings={searchSettings}
        setSearchSettings={setSearchSettings}
      />
      <MovieList searchSettings={searchSettings} />
      <a href="#top" className="upButton">
        <i className="fas fa-chevron-circle-up" />
      </a>
    </div>
  );
}
