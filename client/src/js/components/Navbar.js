import React from 'react';
import { Link } from 'react-router-dom'; 

function Navbar(props) { 
    return ( 
        <div> <h1>Navbar</h1>
            <ul>
                <li>
                    <Link to="/dashoard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/spotify-auth">Spotify Login</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar;
