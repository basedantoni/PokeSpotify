import React, { /* Component */ } from 'react';
import SpotifyButton from './SpotifyButton';
import PokemonList from './PokemonList';
import axios from 'axios';

class Dashboard extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      isLoggedIn: false,
    }
	}
	
  getMe() {
    axios.get('/api/spotify/me')
      .then(res => {
          if(res.data.display_name) {
              this.setState({isLoggedIn: true, name: res.data.display_name})
          }
      })
      .catch(err => console.log(err))
  }
  componentDidMount() {
    this.getMe();
	}
	
  render() {
    const { isLoggedIn } = this.state

    let spotifyLogin;

    isLoggedIn ? spotifyLogin = null : spotifyLogin = <SpotifyButton />
    
    return (
      <div>
        <h1 className="text-4xl font-bold text-gray-700 p-2 m-4">Pokemon Master Playlist</h1>
        <div className="flex flex-wrap justify-center items-center my-8">
          {spotifyLogin}
          <PokemonList isLoggedIn={isLoggedIn} />
        </div>
      </div>
    )
  }
}

export default Dashboard;