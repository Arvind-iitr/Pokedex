
import typesData from "../../api/PokemonTypes.json";
import { useEffect, useState } from "react";
import { TypeList } from "./TypeList";
import { NavLink } from "react-router-dom";
import "../../styles/PokemonCard.css";
export const PokemonCard = ({ data }) => {
  const [type, setType] = useState([]);

  useEffect(() => {
    const matchedTypes = [];
    typesData.forEach((currtype) => {
      data.types.forEach((value) => {
        if (value.type.name === currtype.type) {
          // Check if `currtype` is already in the array
          if (!matchedTypes.find((item) => item.type === currtype.type)) {
            matchedTypes.push(currtype);
          }
        }
      });
    });
    setType(matchedTypes);
  }, [typesData, data.types]); // Add dependencies

  // console.log(type);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
      <div className="pokemon-card">
        <div className="pokemon-image">
          <NavLink to = {`/poke-details/${data.name}`}>
            <img
              src={data.sprites.other.dream_world.front_default}
              alt="poke-image"
              className="pokemon-img"
            />
          </NavLink>
        </div>
        <h2 className="pokemon-name">{capitalizeFirstLetter(data.name)}</h2>
        <div className="type-div">
          <ul className="pokemon-types">
            {type.map((currtypedata) => {
              return (
                <TypeList key={currtypedata.type} typedata={currtypedata} />
              );
            })}
          </ul>
        </div>
        <ul className="pokemon-stats">
          <li>Hp: {data.stats[0].base_stat}</li>
          <li>Attack: {data.stats[1].base_stat}</li>
          <li>Speed: {data.stats[5].base_stat}</li>
        </ul>
        <p className="pokemon-attacks">{`Moves: ${data.moves[0].move.name}, ${data.moves[1].move.name}`}</p>
      </div>
    </>
  );
};
