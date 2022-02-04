import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./App.scss";
import Details from "./Pages/Details/Details";
import Favourites from "./Pages/Favourites/Favourites";
import Home from "./Pages/Home/Home";
import { Char } from "./types/character.types";

const App = () => {
  const [chars, setChars] = useState<any>([]);
  const [selectedChar, setSelectedChar] = useState<Char | null>(null);
  const [favourites, setFavourites] = useState<Char[]>([]);
  const [searchChar, setSearchChar] = useState("");
  const [filteredChars, setFilteredChars] = useState<any>([]);

  const ApiChar = "https://rickandmortyapi.com/api/character";

  useEffect(() => {
    const filteredChar = chars.filter((item: any) => {
      return item.name.toLowerCase().includes(searchChar);
    });
    setFilteredChars(filteredChar);
  }, [searchChar]);

  const getFavouriteChar = () => {
    const LSFavourites = localStorage.getItem("favourites");
    if (!LSFavourites) return;
    setFavourites(JSON.parse(LSFavourites));
  };

  useEffect(getFavouriteChar, []);

  useEffect(() => {
    axios.get(ApiChar).then((res) => {
      setChars(res.data.results);
    });
  }, []);

  return (
    <div className="App">
      <div className="header" style={{ width: "100vw", height: "70px" }}>
        <Link to="favourites" className="favourites">Favourites</Link>
      </div>
      <div>
        <input
          type="search"
          placeholder="Search"
          onChange={(e) => {
            setSearchChar(e.target.value);
          }}
        />
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              chars={searchChar ? filteredChars : chars}
              getFavouriteChar={getFavouriteChar}
              setSelectedChar={setSelectedChar}
            />
          }
        />
        <Route
          path="/details"
          element={<Details selectedChar={selectedChar} />}
        />
        <Route
          path="/favourites"
          element={
            <Favourites
              getFavouriteChar={getFavouriteChar}
              favourites={favourites}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
