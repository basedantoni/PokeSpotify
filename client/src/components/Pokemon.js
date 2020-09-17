import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Pokemon = ({ name, pokeIndex, onClick }) => {
  return (
    <div>
      <button onClick={() => onClick()}>
        <img 
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeIndex + 1}.png`} 
          alt={`pokemon-no-${pokeIndex + 1}`}
          loading="lazy"
          />
      </button>
    </div>
  )
}

export default Pokemon