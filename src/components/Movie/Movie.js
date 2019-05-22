import React, {Component} from 'react';
import {API_URL, API_KEY} from '../../conifg';
import Navigation from '../Navigation/Navigation';
import MovieInfo from './MovieInfo/MovieInfo';
import MovieInfoBar from './MovieInfoBar/MovieInfoBar';
import Grid from '../Grid/Grid';
import Actor from '../Actor/Actor';
import Spinner from '../Spinner/Spinner';


class Movie extends Component {

    render(){
        return(
            <div>
                <Navigation />
                <MovieInfo />
                <MovieInfoBar />
                
                <Spinner />
            </div>
        );
    }
    
};

export default Movie;