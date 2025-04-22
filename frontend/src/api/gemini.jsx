import axios from "axios";

const API_URL = "http://localhost:3000/api/gemini";
axios.defaults.withCredentials = true; //for storing cookies

const api = axios.create({
    baseURL: API_URL
})

export const findPokemon = async (image) => {
    return api.post('/find-pokemon', { pokemonPic : image });
}