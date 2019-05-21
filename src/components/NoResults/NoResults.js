import React  from 'react';
import './NoResults.css';

const NoResults = (props) => {
    return(
        <div className="noResults-container">
            <img src={props.image} alt="Avatar" />
            <div className="noResults-content">
                <p><b>{props.text}</b></p> 
            </div>
        </div>
    );
}

export default NoResults;