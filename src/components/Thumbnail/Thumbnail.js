import React  from 'react';
import {Link} from 'react-router-dom';
import './Thumbnail.css';

const Thumbnail = (props) => {
    return(
        <div className="thumbnail-container">
            {props.clickable ? 
                <Link to={{pathname: `/${props.itemId}`, itemName: `${props.itemName}`}}>
                    <img src={props.image} alt={props.itemName} />
                </Link>
                :
                <img src={props.image} alt={props.itemName} />
            }
            {/* <div className="thumbnail-content">
                <p>{props.movieName}</p> 
            </div> */}
        </div>
    );
}

export default Thumbnail;