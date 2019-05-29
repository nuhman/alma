import React from 'react';
import { IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../conifg';

import './Actor.css';

const getCast = (castArray) => {
    console.log(castArray);
    let cast = [];
    let maximumNeeded = 11;
    castArray.some((castObj, i) => {
        if(i > maximumNeeded)
            return true;
        cast.push(
            <div className="actor-card" key={castObj.id}> 
                <img src={castObj.profile_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${castObj.profile_path}` : './images/nothumbnail.jpg'} alt="Cast" />
                <div className="actor-name">
                    <h4><b>{castObj.name}</b></h4> 
                    <p>{castObj.character}</p>
                </div>
            </div>
        );
    });
    return cast;
}

const Actor = (props) => {
    return(
        <div className="actor-container">
            <div className="movieInfo-item-title">CAST</div>
            <div className="actor-content">
                {getCast(props.actors)}
            </div>
            {/* <div class="fade"></div> */}
        </div>
    );
}

export default Actor;