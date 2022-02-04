import React from 'react';
import { Link } from 'react-router-dom';
import SingleCharacter from '../../Components/SingleCharacter';
import { Char } from "../../types/character.types";

interface FavouriteProp {
  favourites: Char[]
  getFavouriteChar: Function;
}

const Favourites = ({favourites, getFavouriteChar}: FavouriteProp) => {
  return (
    <div className='favourites'>
      {favourites.map((favourite: any, i) => (
        <SingleCharacter getFavouriteChar={getFavouriteChar} key={i} setSelectedChar={() => null} char={favourite}/>
      ))}{" "}
    <Link to="/">
      <div>
    <button>Back</button>
      </div>
    </Link>
  </div>
);
};

export default Favourites;
