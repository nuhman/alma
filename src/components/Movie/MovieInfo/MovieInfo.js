import React from 'react';
import { IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../../conifg';
import Thumbnail from '../../Thumbnail/Thumbnail';
import Rating from '../../Rating/Rating';
import MovieInfoBar from '../MovieInfoBar/MovieInfoBar';


import './MovieInfo.css';

const getGenre = (genreArray) => {
    return genreArray.map(genreObj => <p key={genreObj.id}>{genreObj.name}</p>);
}

const getDirectors = (directorsArray) => {
    return directorsArray.map(directorsObj => (
        <div className="movieInfo-directors-card" key={directorsObj.id}> 
            <img src={directorsObj.profile_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${directorsObj.profile_path}` : './images/nothumbnail.jpg'} alt="Director" />
            <div className="movieInfo-directors-name">
                <h4><b>{directorsObj.name}</b></h4> 
            </div>
        </div>
    ));
}

const getTitle = (title, originalTitle) => {
    if(title !== originalTitle)
return [<p>{title}</p>, <p>({originalTitle})</p>];
    return <p>{title}</p>;
}

const getTagline = (tagline) => {
    if(tagline)
        return `“${tagline}”`;
    return null;
}

const MovieInfo = (props) => {
    let imageUrl = `${IMAGE_BASE_URL}${POSTER_SIZE}${props.image}`;
    return(
        <div className="movieInfo-container" >
            <div className="movieInfo-image">
                <img src={imageUrl} alt="poster_image" />
            </div>
            <div className="movieInfo-content">
                <div className="movieInfo-title-genre">
                    <div>{getTitle(props.title,  props.original_title)}</div>
                    <div className="movieInfo-tagline">{getTagline(props.tagline)}</div>
                    <div className="movieInfo-genre">{getGenre(props.genres)}</div>
                </div>
            </div>
            <div className="movieInfo-imdb">
                <div className="movieInfo-item-title">IMDB RATING</div>
                <Rating rating={props.rating}/>
                {/* <div className="movieInfo-imdb-rating-div">
                    <div className="movieInfo-imdb-rating">{props.rating * 10}%</div>
                    <div className="movieInfo-imdb-bardiv">
                        <div className="movieInfo-imdb-bar" style={{width: `${props.rating * 10}%`}}>
                        </div>
                    </div>
                </div> */}
             </div>

            <div className="movieInfo-plot">
                <div className="movieInfo-item-title">OVERVIEW</div>
                <div className="movieInfo-plot-content">
                    <p>{props.overview}</p>
                </div>
            </div>

            <MovieInfoBar duration={props.duration} 
                            revenue={props.revenue} 
                            budget={props.budget}
                    />

            <div className="movieInfo-item-title">DIRECTORS</div>
            <div className="movieInfo-directors">
                    {getDirectors(props.directors)}
            </div> 

        </div>
    );
}

export default MovieInfo;