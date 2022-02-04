import React from "react";
import { Link } from "react-router-dom";
import { Char } from "../../types/character.types";

interface DetailsProp {
  selectedChar: Char | null;
}

const Details = ({ selectedChar }: DetailsProp) => {
  if (!selectedChar) return <div>Error</div>;
  return (
    <div>
      <div>
        <img src={selectedChar.image} alt="#" />
      </div>
      <div>{selectedChar.name}</div>
      <div>{selectedChar.gender}</div>
      <div>{selectedChar.origin.name}</div>
      <div>{selectedChar.species}</div>
      <div>{selectedChar.status}</div>
      <div>{selectedChar.id}</div>
      <Link to="/">
        <button>Back</button>
      </Link>
    </div>
  );
};

export default Details;
