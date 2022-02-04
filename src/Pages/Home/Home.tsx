import React from "react";
import { Char } from "../../types/character.types";
import SingleCharacter from "../../Components/SingleCharacter";
import "./Home.scss";

interface HomeProps {
  chars: Char[];
  setSelectedChar: Function;
  getFavouriteChar: Function;
}

const Home = ({ chars, setSelectedChar, getFavouriteChar }: HomeProps) => {
  return (
    <div className="home">
      {chars.map((char, i) => {
        return (
          <div key={i}>
            <SingleCharacter
              char={char}
              key={i}
              setSelectedChar={setSelectedChar}
              getFavouriteChar={getFavouriteChar}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Home;
