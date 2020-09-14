import React from 'react'

const Pokemon = ({ name, onClick }) => {
  return (
    <div>
      <button onClick={() => onClick()}>{name}</button>
    </div>
  )
}

export default Pokemon