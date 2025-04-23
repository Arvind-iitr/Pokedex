//helper function to make the code more cleaner

import { getpokemonDetails } from "../api/pokemonApi"

export const getPokemonImageUrl = async(name) =>{
  try {
    const response = await getpokemonDetails(name.toLowerCase())
    return response.data.sprites.other.dream_world.front_default;
  } catch (error) {
    console.log(error)
  }
}