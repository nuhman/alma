import React from 'react';
import Flickity from 'react-flickity-component';
import {Link, BrowserRouter } from 'react-router-dom';
import { IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../conifg';

import './Actor.css';

const getCast = (castArray) => {
    console.log(castArray);
    // let cast = [];
    // let maximumNeeded = 11;
    // castArray.some((castObj, i) => {
    //     if(i > maximumNeeded)
    //         return true; 
    //     cast.push(
    //         <div className="actor-card" key={castObj.id}> 
    //             <img src={castObj.profile_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${castObj.profile_path}` : './images/nothumbnail.jpg'} alt="Cast" />
    //             <div className="actor-name">
    //                 <h4><b>{castObj.name}</b></h4> 
    //                 <p>{castObj.character}</p>
    //             </div>
    //         </div>
    //     );
    // });
    // return cast;

    return castArray.map((castObj,i) => (
        <div className="actor-card" key={castObj.cast_id}>
            <Link to={{
                            pathname: `/profile/${castObj.id}`, 
                            itemName: `${castObj.title}`
                        }}                  
                        onClick={() => console.log("af")}      
                        >
            <div className="actor-card-image" style={{backgroundImage: `url(${castObj.profile_path ? (IMAGE_BASE_URL + POSTER_SIZE + castObj.profile_path) : './images/nothumbnail.jpg'})`}}></div>		
            <h4>{castObj.name ? castObj.name : "N.A"}</h4>
            <p>{castObj.character ? castObj.character : "N.A"}</p>
            </Link>
	    </div> 
    ));


}

const Actor = (props) => {
    return(
        <div className="actor-container">
            {/* <div className="movieInfo-item-title">CAST</div>
            <div className="actor-content">
                {getCast(props.actors)}
            </div> */}
            {/* <div class="fade"></div> */}
            <div className="movieInfo-item-title">CAST</div>
            <Flickity
      className={''} // default ''
      options={{
        initialIndex: 0,
        freeScroll: true,
        pageDots: false,
        cellAlign: 'left'
    }}
      disableImagesLoaded={false} // default false
      reloadOnUpdate // default false
    >
            {getCast(props.actors)}

            </Flickity>
        </div>
    );
}

export default Actor;