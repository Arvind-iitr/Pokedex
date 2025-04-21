import React, { useState } from "react";
import { useEffect } from "react";

export const EvolutionList = (props) => {
  const [evlArray, setEvlArray] = useState([]);
  const data = props.data;
  const TEMPAPI = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    const fetchEvolutionData = async () => {
      const tempArr = await Promise.all(
        data.map(async (cur) => {
          if (cur) {
            const tempUrl = `${TEMPAPI}/${cur}`;
            const res = await fetch(tempUrl);
            const resdata = await res.json();
            return {
              name: cur,
              url: resdata.sprites.other.dream_world.front_default,
            };
          }
          return null;
        })
      );
  
      // Filter out any null entries if `cur` was falsy
      setEvlArray(tempArr.filter((obj) => obj !== null));
    };
  
    fetchEvolutionData();
  }, [data]);
  

  // console.log(evlArray);

  return (
    <>
      <p>Evolutions</p>
     
        <ul className="evolution-chain">
          {evlArray.map((cur) => {
            return(
                <li key={cur.name}>
                <div className="evolution">
                  <div className="inside-img">
                  <img src={cur.url} alt="Squirtle" />
                  </div>
                  
                  <p>{cur.name}</p>
                </div>
              </li>

            );
           
          })}
        </ul>
    
    </>
  );
};
