import React, {Component} from 'react';
import {API_URL, API_KEY} from '../../conifg';
import Navigation from '../Navigation/Navigation';
import MovieInfo from './MovieInfo/MovieInfo';
import MovieInfoBar from './MovieInfoBar/MovieInfoBar';
import Grid from '../Grid/Grid';
import Actor from '../Actor/Actor';
import Spinner from '../Spinner/Spinner';


class Movie extends Component {

    state = {
        movie: null,
        actors: null,
        directors: [],
        loading: false
    }

    componentDidMount(){
        this.setState({
            loading: true
        });
        // first fetch the movie
        const endPoint = `${API_URL}movie/${this.props.match.params.itemId}?api_key=${API_KEY}&language=en-US`;
        this.fetchItems(endPoint);
    }

    fetchItems = (endPoint) => {
        fetch(endPoint)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if(res.status_code){
                    this.setState({
                        loading: false
                    });
                } else {
                    this.setState({
                        movie: res
                    }, () => {
                        const url = `${API_URL}movie/${this.props.match.params.itemId}/credits?api_key=${API_KEY}`;
                        fetch(url)
                            .then(res => res.json())
                            .then(res => {
                                console.log(res);
                                const directors = res.crew.filter(member => member.job === "Director");
                                this.setState({
                                    actors: res.cast,
                                    directors,
                                    loading: false
                                })
                            });
                    });
                }
            })
            .catch(error => console.log('Error while fetching movie details', error));
    }

    render(){
        return(
            <div>
                <Navigation />
                <MovieInfo />
                <MovieInfoBar />
                <Actor />
                <Spinner />
            </div>
        );
    }
    
};

export default Movie;