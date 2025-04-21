import React, { useEffect, useState } from 'react'
import { getpokemondata } from '../../api/pokemonApi';
import { useAppContext } from '../../context/AppContext';
import { PokemonCard } from './PokemonCard';
import "../../styles/PokemonCatalog.css";

export const PokemonCatalog = () => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { search, setSearch } = useAppContext();

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                const data = await getpokemondata();
                setPokemons(data);
            } catch (error) {
                setError("Failed to fetch Pokemon data");
                console.error("Error fetching Pokemon data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPokemonData();
    }, []);

    //search functionality
    const searchData = pokemons.filter((cur) =>
        cur.name.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="s-3-div">
            <ul className="section-3">
                {searchData.map((curPokemon) => {
                    return <PokemonCard key={curPokemon.id} data={curPokemon} />;
                })}
            </ul>
        </div>
    );
};