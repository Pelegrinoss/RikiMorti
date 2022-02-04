import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Char } from "../types/character.types";

interface SingleCharacterProp {
  char: Char;
  setSelectedChar: Function;
  getFavouriteChar: Function;
}

const SingleCharacter = ({
  char,
  setSelectedChar,
  getFavouriteChar,
}: SingleCharacterProp) => {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const favouritesFromLS = JSON.parse(
      localStorage.getItem("favourites") || ""
    );
    if (favouritesFromLS) {
      const foundObj = favouritesFromLS.find(
        (charFromLS: any) => charFromLS.id === char.id
      );
      setIsFav(!!foundObj);
    }
  }, [char]);

  const addToFavourites = () => {
    const favouritesFromLS = localStorage.getItem("favourites");
    if (!favouritesFromLS) {
      const stringChar = JSON.stringify([char]);
      localStorage.setItem("favourites", stringChar);
    } else {
      const jsonFavouritesFromLS = JSON.parse(favouritesFromLS);
      if (
        jsonFavouritesFromLS.find(
          (characterLS: Char) => characterLS.id === char.id
        )
      )
        return;
      jsonFavouritesFromLS.push(char);
      localStorage.setItem("favourites", JSON.stringify(jsonFavouritesFromLS));
    }
    setIsFav(true);
    getFavouriteChar(favouritesFromLS);
  };

  const removeFromFavourites = () => {
    console.log("getovo fav1");
    const favouritesFromLS = localStorage.getItem("favourites");
    if (!favouritesFromLS) {
      return null;
    } else {
      const parsedFavouritesFromLS = JSON.parse(favouritesFromLS);
      const filteredFavouritesFromLS = parsedFavouritesFromLS.filter(
        (charFromLS: any) => charFromLS.id !== char.id
      );
      setIsFav(false);
      localStorage.setItem(
        "favourites",
        JSON.stringify(filteredFavouritesFromLS)
      );
    }
    getFavouriteChar();
  };

  const changeFav = () => (isFav ? removeFromFavourites : addToFavourites);

  const handleChangeFav = () => {
    console.log(char);
    changeFav()();
  };
  return (
    <div
      onClick={() => {
        setSelectedChar(char);
      }}
    >
      <Link to="details">
        <h3 className="name">{char.name}</h3>
        <img src={char.image} alt="#" />
      </Link>
      <button onClick={() => handleChangeFav()}>
        {isFav ? "Remove From Favourites" : "Add To Favourites"}
      </button>
    </div>
  );
};

export default SingleCharacter;
