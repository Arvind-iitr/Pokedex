import React, { useEffect, useState } from 'react'
import "../../styles/PokemonCatches.css"
import { useAppContext } from '../../context/AppContext'
import { getPokemonImageUrl } from '../../utils/helperFunctions';
import { Loader } from '../IU/Loader';

export const PokemonCatches = () => {
  const { userData } = useAppContext();
  const [pokeIndex, setPokeIndex] = useState(0);

  const currentPokemon = userData.identifiedPokemon[pokeIndex];

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    async function fetchImage() {
      const url = await getPokemonImageUrl(currentPokemon.name);
      setImageUrl(url);
    }
    fetchImage();
  }, [currentPokemon.name]);



  //laoding state
  if (!userData) return <Loader/>

  return (
    <div className='pokemon-catches-wrapper'>
      <div className="pc-section1">
        {
          userData.identifiedPokemon.map((pokemon, index) => {
            return (
              <div key={index} className="pc-pokemon-card" onClick={() => setPokeIndex(index)} >
                <img src={pokemon.imageUrl} alt="" />
                <h3>{pokemon.name}</h3>
              </div>

            )
          })

        }

      </div>
      <div className="pc-section2">
        <div className="bhaimon-card-container">
          <div className="bhaimon-card-inner">
            <div className="bhaimon-card-left">
              <div className="bhaimon-image-box">
                <img
                  src={imageUrl}
                  alt={currentPokemon.name}
                  className="bhaimon-image"
                />
              </div>
              <div className="bhaimon-attacks-list">
                <div className="bhaimon-attack-box">{currentPokemon.attacks[0]}</div>
                <div className="bhaimon-attack-box">{currentPokemon.attacks[1]}</div>
                <div className="bhaimon-attack-box">{currentPokemon.attacks[2]}</div>
                <div className="bhaimon-attack-box">{currentPokemon.attacks[3]}</div>

              </div>
            </div>
            <div className="bhaimon-card-right">
              <div className="bhaimon-details-box">
                <div className="bhaimon-detail-row">
                  <span className="bhaimon-detail-label">name</span>
                  <span className="bhaimon-detail-value">{currentPokemon.name}</span>
                </div>
                <div className="bhaimon-detail-row">
                  <span className="bhaimon-detail-label">rarity</span>
                  <span className={`bhaimon-rarity-box bhaimon-rarity-${currentPokemon.rarity}`}>{currentPokemon.rarity}</span>
                </div>
                <div className="bhaimon-detail-row">
                  <span className="bhaimon-detail-label">type</span>
                  {
                    currentPokemon.type.map((type, index) => {
                      return (
                        <span key={index} className={`bhaimon-type-box bhaimon-type-${type.toLowerCase()}`}>{type}</span>
                      )
                    })
                  }
                </div>
              </div>
              <div className="bhaimon-description">
                {currentPokemon.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
