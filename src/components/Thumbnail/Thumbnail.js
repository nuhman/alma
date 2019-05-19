import React  from 'react';
import './Thumbnail.css';

const Thumbnail = (props) => {
    return(
        <div className="thumbnail-container">
            <img src={props.image} alt="Avatar" />
            <div className="thumbnail-content">
                <p>{props.movieName}</p> 
            </div>
        </div>
    );
}

export default Thumbnail;