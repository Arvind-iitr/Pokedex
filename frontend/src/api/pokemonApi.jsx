//to get p0okemon data from pokemon api etc

import axios from "axios";


const pokeapi = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  withCredentials: false, //for storing cookies
})

export const getpokemondata = async (limit = 100) => {
  try {
    const res = await pokeapi.get(`/pokemon?limit=${limit}`);
    console.log("first result", res.data.results);

    //call all the url in the data that we got
    const detailedPromises = res.data.results.map(async (cur) => {
      const res = await fetch(cur.url);
      const data = res.json();
      return data;
    });

    //settling all the promises at once to get the data
    const detailedData = await Promise.all(detailedPromises);
    return detailedData;
  } catch (error) {
    console.log(error)
  }
}

export const getpokemonDetails = (name) => {
  return pokeapi.get(`/pokemon/${name}`);

}