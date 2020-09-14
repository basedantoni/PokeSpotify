import React from 'react'

const Pokemon = ({ name, handleClick }) => {
  return (
    <div>
      <button onClick={handleClick}>{name}</button>
    </div>
  )
}

export default Pokemon