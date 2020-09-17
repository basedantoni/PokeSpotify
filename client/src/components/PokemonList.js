import React, { useState, useEffect } from 'react'
import Pokemon from './Pokemon'
import axios from 'axios'

const PokemonList = ({ isLoggedIn }) => {
  // Pokemon State
  const [pokemon, setPokemon] = useState([])
  useEffect(() => {
    async function fetchPokemon() {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
      let pokemonArr = res.data.results

      setPokemon(pokemonArr)
    }
    fetchPokemon()
  }, [])

  // Team State
  const [team, setTeam] = useState([])
  const [teamCount, setTeamCount] = useState(0)

  const addPokemon = async (name, pokeIndex, url) => {
    if(teamCount < 6) {
      // Increments Team Count
      setTeamCount(teamCount + 1)
      // Fetch this pokemon's types
      const res = await axios.get(url)
      // Create Pokemon object
      const pokemon = { name, pokeIndex, types: res.data.types }

      // Pushes New Team Member to Team
      team.push(pokemon)
      setTeam(team)
    } else {
      console.log('Party is full')
    }
  }

  const removePokemon = (index) => {
    if(teamCount > 0) {
      setTeamCount(teamCount - 1)

      // Filters team based on the index of the array selected
      setTeam(team.filter((_, i) => i !== index))
    } else {
      console.log('Party is empty')
    }
  }

  const makePlaylist = (team) => {
    if(teamCount === 6) {
      axios.post('/api/spotify/makePlaylist', team)
      return 'Creating Playlist'
    } else {
      return 'Fill You Team Up First!'
    }
  }

  let list;
  isLoggedIn ? list = 
    <div>
      <h2>Choose Your Team</h2>
      {pokemon.map(({ name, url }, index) => (
        <Pokemon onClick={() => addPokemon(name, index, url)} pokeIndex={index + 1} name={name} key={url} />
      ))}
      <h1>Team</h1>
      {team.map(({ name, pokeIndex }, index) => (
        <Pokemon onClick={() => removePokemon(index)} pokeIndex={pokeIndex + 1} name={name} key={index} />
      ))}
      <button onClick={() => makePlaylist(team)}>Make Playlist</button>
    </div>
  :
  list = null

  return (
    <div>
      {list}
    </div>
  )
}

export default PokemonList;