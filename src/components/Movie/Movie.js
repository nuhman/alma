import React, {Component} from 'react';
import {API_URL, API_KEY} from '../../conifg';
import Navigation from '../Navigation/Navigation';
import MovieInfo from './MovieInfo/MovieInfo';
import MovieInfoBar from './MovieInfoBar/MovieInfoBar';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import Grid from '../Grid/Grid';
import Actor from '../Actor/Actor';
import Spinner from '../Spinner/Spinner';
import Rating from '../Rating/Rating';
import SimilarMovies from '../SimilarMovies/SimilarMovies';


class Movie extends Component {

    state = {
        movie: null,
        video: null,
        actors: null,
        directors: [],
        loading: false
    }

    _initializeComponent = (movieId) => {
        this.setState({
            loading: true
        });
        // first fetch the movie
        let endPoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
        this.fetchItems(endPoint);
        
    }

    componentDidMount(){
        this._initializeComponent(this.props.match.params.itemId);
    }

    componentWillReceiveProps(nextProps){
        this._initializeComponent(nextProps.match.url.substring(1, nextProps.match.url.length))
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
                        console.log("**Movies is", this.state.movie);
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
        if(!this.state.movie || !this.state.directors || !this.state.actors || this.state.loading)
            return <div></div>; /*<div style={{marginLeft: 'auto', marginRight: 'auto'}}>Hi</div>; //<div className="movie-container"><Spinner /></div>;*/
        return(
            <div>
                <Navigation movieName={this.state.movie.title}/>
                <MovieInfo image={this.state.movie.backdrop_path} 
                    title={this.state.movie.title}
                    original_title={this.state.movie.original_title}
                    genres={this.state.movie.genres}
                    tagline={this.state.movie.tagline}
                    rating={this.state.movie.vote_average}
                    vote_count={this.state.movie.vote_count}
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
                <VideoPlayer opts={{
                            height: '320',
                            width: '320',
                            playerVars: { 
                                autoplay: 0
                            }}}
                            movieId={this.state.movie.id}
                        />
                <SimilarMovies movieId={this.state.movie.id} tag="YOU MAY ALSO LIKE"/>
            </div>
        );
    }
    
};

export default Movie;