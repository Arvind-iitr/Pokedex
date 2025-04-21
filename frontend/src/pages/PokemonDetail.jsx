import React, { useState, useEffect } from "react";

import { RadarChart } from "../components/pokemon/RadarChart";
import { MovesTable } from "../components/pokemon/MovesTable";
import typesData from "../api/PokemonTypes.json";
import { TypeList } from "../components/pokemon/TypeList";
import { EvolutionList } from "../components/pokemon/EvolutionList";
import { getpokemonDetails } from "../api/pokemonApi";
import "../styles/pokemonDetail.css";
import { useParams } from "react-router-dom";

export const PokemonDetail = () => {
    const params = useParams();
    const pokename = params.pokename;
  const [evolution, setEvolution] = useState({
    previous: "",
    middle: "",
    next: "",
  });

  const [speciesInfo, setSpeciesInfo] = useState({
    habitat: "",
    flavorText: "",
    category: "",
    isLegendary: false,
  });

  const [typeInfo, setTypeInfo] = useState({
    types: [],
    weaknesses: [],
  });

  const [moveSet, setMoveSet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState(null); // set to null initially

  const fetchPokemon = async () => {
    try {
      const res = await getpokemonDetails(pokename);
      const resdata = res.data;
      setData(resdata);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  // Fetch evolution and species info
  useEffect(() => {
    if (!data?.species?.url) return;

    const fetchPokemonInfo = async () => {
      try {
        const res = await fetch(data.species.url);
        const speciesData = await res.json();

        const res2 = await fetch(speciesData.evolution_chain.url);
        const evolutionData = await res2.json();

        const number = Math.floor(Math.random() * 10) + 1;

        setEvolution({
          previous: evolutionData.chain.species.name,
          middle: evolutionData.chain.evolves_to?.[0]?.species.name || "",
          next:
            evolutionData.chain.evolves_to?.[0]?.evolves_to?.[0]?.species
              ?.name || "",
        });

        setSpeciesInfo({
          habitat: speciesData.habitat?.name || "Unknown",
          flavorText: speciesData.flavor_text_entries[number]?.flavor_text || "",
          category: speciesData.genera?.[7]?.genus || "Unknown",
          isLegendary: speciesData.is_legendary || false,
        });
      } catch (error) {
        console.error("Error fetching Pokémon info:", error);
      }
    };

    fetchPokemonInfo();
  }, [data]);

  // Fetch types and weaknesses
  useEffect(() => {
    if (!data?.types) return;

    const matchedTypes = [];

    data.types.forEach((value) => {
      const match = typesData.find((t) => t.type === value.type.name);
      if (match && !matchedTypes.find((item) => item.type === match.type)) {
        matchedTypes.push(match);
      }
    });

    const combinedWeaknesses = matchedTypes.flatMap((t) => t.weakness || []);
    const uniqueWeaknesses = [...new Set(combinedWeaknesses)];

    setTypeInfo({
      types: matchedTypes,
      weaknesses: uniqueWeaknesses,
    });
  }, [data]);

  // Fetch strong moves
  useEffect(() => {
    if (!data?.moves) return;

    const fetchMoves = async () => {
      try {
        const movePromises = data.moves.map(async (cur) => {
          try {
            const res = await fetch(cur.move.url);
            const moveData = await res.json();

            if (moveData.power >= 120) {
              return {
                name: cur.move.name,
                type: moveData.damage_class.name,
                power: moveData.power,
              };
            }
            return null;
          } catch {
            return null;
          }
        });

        const allMoves = await Promise.all(movePromises);
        const uniqueMoves = [];
        const seen = new Set();

        allMoves.forEach((move) => {
          if (move && !seen.has(move.name)) {
            uniqueMoves.push(move);
            seen.add(move.name);
          }
        });

        setMoveSet(uniqueMoves);
      } catch (error) {
        console.error("Error fetching moves:", error);
      }
    };

    fetchMoves();
  }, [data]);

  // Loading and error UI
  if (loading || !data) {
    return <h1>Loading....</h1>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (

    <>
    <div className="pokemon-details-container">
    <div className="card">
      <div className="header">
        <h1>
          {data.name.toUpperCase()} <span>{`##${data.id}`}</span>
        </h1>

      </div>

      <div className="content">
        <div className="image-section">
          <img
            src={data.sprites?.other?.dream_world?.front_default}
            alt="pokemage"
          />
          <p className="description">{speciesInfo.flavorText}</p>
        </div>

        <div className="details">
          

          <div className="info">
            <p><strong>Height:</strong> {data.height}</p>
            <p><strong>Weight:</strong> {data.weight}</p>
            <p><strong>Category:</strong> {speciesInfo.category}</p>
            <p><strong>Habitat:</strong> {speciesInfo.habitat}</p>
            <p><strong>Legendary:</strong> {speciesInfo.isLegendary ? "True" : "False"}</p>
          </div>

          <div className="type">
            <ul className="pokemon-types">
              {typeInfo.types.map((typedata) => (
                <TypeList key={typedata.type} typedata={typedata} />
              ))}
            </ul>
          </div>

          <div className="weaknesses">
            <p><strong>Weaknesses:</strong></p>
            {typeInfo.weaknesses.map((w, index) => (
              <span key={index} className="weakness">{w}</span>
            ))}
          </div>
        </div>

        <div className="stats">
          <div className="stats-chart">
            <p>Stats</p>
            <RadarChart data={data} />
          </div>
          <MovesTable moves={moveSet} />
        </div>

        <div className="evolutions">
          <EvolutionList data={[evolution.previous, evolution.middle, evolution.next]} />
        </div>
      </div>
    </div>
    </div>
    </>
  );
};
