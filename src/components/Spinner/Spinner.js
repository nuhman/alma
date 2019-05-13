import React from 'react';
import './Spinner.css';

const Spinner = (props) => {
    return(
        <div className="spinner_container">
            <img src="./images/rotating-ring-loader.gif" alt="spinner" />
        </div>
    );
}

export default Spinner;