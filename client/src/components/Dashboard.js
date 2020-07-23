import React, { Component } from 'react';
import axios from 'axios';
import { get } from 'request';

class Dashboard extends React.Component {
    constructor() {
        super()

        this.state = {
            name: 'null',
        }
    }

    getMe() {
      axios.get('/api/spotify/me')
        .then(res => {
            this.setState({
                name: res.data
            })
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
                <button onClick={this.getMe}>Login</button>
            </div>
        )
    }
}

export default Dashboard;
