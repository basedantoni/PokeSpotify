import React, { Component } from 'react';
import axios from 'axios';

class Dashboard extends React.Component {
    constructor() {
        super()

        this.state = {
            name: 'null',
        }
    }

    getHello() {
      axios.get('/api/spotify/hello', (req, res) => {
        console.log(res)
      })
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <h1>Dashboard { this.state.name }</h1>
                <button onClick={this.getHello}>Login</button>
            </div>
        )
    }
}

export default Dashboard;
