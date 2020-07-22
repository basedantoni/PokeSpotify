import React from 'react';
import axios from 'axios';

import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';

class App extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <Dashboard />
                <h1>Hello Spotify Listener</h1>
                <a href='http://localhost:5000/api/spotify/auth'>Login</a>
            </div>
        )
    }
}

export default App;