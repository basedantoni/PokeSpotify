import React from 'react';
import axios from 'axios';

export const App = () => {
    return (
        <div>
            <h1>Hello Spotify Listener</h1>
            <a href='http://localhost:5000/api/spotify/auth'>Login</a>
        </div>
    )
}