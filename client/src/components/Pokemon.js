import React from 'react'

const Pokemon = ({ name, pokeIndex, onClick }) => {
  return (
    <div>
      <button className="btn bg-white hover:bg-gray-300" onClick={() => onClick()}>
        <img 
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeIndex}.png`} 
          alt={`pokemon-no-${pokeIndex}`}
          loading="lazy"
          />
        <p>{name.toUpperCase()}</p>
      </button>
    </div>
  )
}

export default Pokemon