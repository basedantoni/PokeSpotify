import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from 'axios';

import Navbar from './Navbar.js';
import Dashboard from './Dashboard.js';
import SpotifyAuth from './SpotifyAuth.js';



class App extends React.Component {
    constructor() {
        super();

        this.state = {
            ho: ''
        }
    }
    componentDidMount() {
        axios.get('/api/spotify/hello', (req, res) => {
            this.setState({ho: res.message})
        })
    }

    render() {
        return (
            <Router>
                <div>
                    <h1>{this.state.ho}</h1>
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
