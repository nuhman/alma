import React, {Component} from 'react';
import {API_URL, API_KEY} from '../../conifg';
import Navigation from '../Navigation/Navigation';
import MovieInfo from './MovieInfo/MovieInfo';
import MovieInfoBar from './MovieInfoBar/MovieInfoBar';
import Grid from '../Grid/Grid';
import Actor from '../Actor/Actor';
import Spinner from '../Spinner/Spinner';
import Rating from '../Rating/Rating';


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
                                //const actors = res.cast.filter(actor => true);
                                this.setState({
                                    directors,
                                    actors: res.cast,
                                    loading: false
                                }, () => console.log("Actors is", this.state.actors));
                            });
                    });
                }
            })
            .catch(error => console.log('Error while fetching movie details', error));
    }

    render(){
        if(!this.state.movie || !this.state.directors || !this.state.actors)
            return <div></div>;
        return(
            <div>
                <Navigation movieName={this.state.movie.title}/>
                <MovieInfo image={this.state.movie.poster_path} 
                    title={this.state.movie.title}
                    original_title={this.state.movie.original_title}
                    genres={this.state.movie.genres}
                    tagline={this.state.movie.tagline}
                    rating={this.state.movie.vote_average}
                    overview={this.state.movie.overview}
                    directors={this.state.directors}
                    duration={this.state.movie.runtime} 
                    revenue={this.state.movie.revenue} 
                    budget={this.state.movie.budget}
                    />
                {/* <MovieInfoBar duration={this.state.movie.runtime} 
                            revenue={this.state.movie.revenue} 
                            budget={this.state.movie.budget}
                    /> */}
                <Actor actors={this.state.actors}/>
                <Spinner />
                
            </div>
        );
    }
    
};

export default Movie;