import React, { Component } from 'react';

class SpotifyAuth extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello Spotify Listener</h1>
                <a href='http://localhost:5000/api/spotify/auth'>Login</a>
            </div>
        )
    }
}

export default SpotifyAuth;
