import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from './Navbar.js';
import Dashboard from './Dashboard.js';
import SpotifyAuth from './SpotifyAuth.js';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Navbar/>
                    <Switch>
                        <Route exact path="/dashbord" >
                            <Dashboard />
                        </Route>
                        <Route exact path="/spotify-auth" >
                            <SpotifyAuth />
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;

const wrapper = document.getElementById('root');
wrapper ? ReactDOM.render(<App />, wrapper) : false;
