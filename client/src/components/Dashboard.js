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
    return (
      <div>
        <h1>Dashboard { this.state.name }</h1>
        <SpotifyButton isLoggedIn={this.state.isLoggedIn} />
        <PokemonList />
      </div>
    )
  }
}

export default Dashboard;
