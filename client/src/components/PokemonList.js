import React, { useState, useEffect } from 'react'
import Pokemon from './Pokemon'
import Message from './Message'
import axios from 'axios'

const PokemonList = ({ isLoggedIn }) => {
  // Pokemon State
  const [pokemon, setPokemon] = useState([])
  useEffect(() => {
    const fetchPokemon = async () => {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
      let pokemonArr = res.data.results

      setPokemon(pokemonArr)
    }
    fetchPokemon()
  }, [])

  // Team State
  const [team, setTeam] = useState([])
  const [teamCount, setTeamCount] = useState(0)

  // Message State
  const [message, setMessage] = useState()

  const addPokemon = async (name, pokeIndex, url) => {
    if(teamCount < 6) {
      // Fetch this pokemon's types
      const res = await axios.get(url)
      // Create Pokemon object
      const pokemon = { name, pokeIndex, types: res.data.types }
      // Pushes New Team Member to Team
      team.push(pokemon)
      // Increments Team Count
      setTeamCount(teamCount + 1)
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
        .then(res => {
          setMessage(res.data)
          setTeam([])
        })
        .catch(err => console.log(err))
      return 'Creating Playlist'
    } else {
      return 'Fill You Team Up First!'
    }
  }

  let teamTitle
  team.length ? teamTitle = <h1 className="mb-2 text-gray-700">Your Team</h1> : teamTitle = null

  let playlistBtn
  team.length === 6 ? playlistBtn = 
    <button className="btn bg-white hover:bg-gray-100 text-gray-800 font-semibold my-2 py-2 px-4 border border-gray-400 rounded shadow" 
    onClick={() => makePlaylist(team)}>Make Playlist</button>
    :
    playlistBtn = null

  let list
  isLoggedIn ? list = 
    <div className="flex flex-col items-center">
      <h2 className="mb-2 text-gray-700">Choose 6 Pokemon For Your Team</h2>
      <div className="flex flex-wrap overflow-y-scroll mb-4 h-64 md:w-4/12 w-11/12 rounded bg-white shadow-lg">
        {pokemon.map(({ name, url }, index) => (
          <Pokemon onClick={() => addPokemon(name, index, url)} pokeIndex={index + 1} name={name} key={url} />
        ))}
      </div>
      {teamTitle}
      <div className="flex flex-wrap justify-center">
        {team.map(({ name, pokeIndex }, index) => (
          <Pokemon onClick={() => removePokemon(index)} pokeIndex={pokeIndex + 1} name={name} key={index} />
        ))}
      </div>
      {playlistBtn}
    </div>
  :
  list = null

  return (
    <div>
      {list}
      <Message message={message} />
    </div>
  )
}

export default PokemonList;