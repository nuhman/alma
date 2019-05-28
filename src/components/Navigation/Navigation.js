import React from 'react';
import {Link} from 'react-router-dom';

import './Navigation.css';

const Navigation = (props) => {
    return(
        <div className="navigation-container">
            <Link to="/" className="navigation-link">
                <p>Home</p>                
            </Link>
            <p>></p>
            <p className="navigation-title">{props.movieName}</p>
        </div>
    );
}

export default Navigation;