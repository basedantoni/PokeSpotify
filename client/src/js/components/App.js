import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    render() {
        return <h1>Hello Spotify Recommends</h1>;
    }
}

export default App;

const wrapper = document.getElementById('root');
wrapper ? ReactDOM.render(<App />, wrapper) : false;
