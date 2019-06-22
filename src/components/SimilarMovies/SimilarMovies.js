import React, {Component} from 'react';
import {Link, BrowserRouter } from 'react-router-dom';
import Flickity from 'react-flickity-component';
import {API_URL, API_KEY} from '../../conifg';
import { IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../conifg';

import './SimilarMovies.css';

class SimilarMovies extends Component {

    state = {
        movies: [],
        loading: false
    };

    componentDidMount(){
        if(this.props.movieId){
            this.setState({
                loading: true
            });
            this.getSimilarMovies(this.props.movieId);
        } else {
            console.log("!!!!", this.props.movies);
            this.setState({
                movies: this.props.movies
            }, console.log("MOvies is set", this.state.movies));
        }
        
    }

    componentWillReceiveProps(){
        if(this.props.movieId){
            this.setState({
                loading: true
            });
            this.getSimilarMovies(this.props.movieId);
        } else {
            console.log("!!!!", this.props.movies);
            this.setState({
                movies: this.props.movies
            }, console.log("MOvies is set", this.state.movies));
        }
        
    }

    

    getSimilarMovies = (id) => {
        const endPoint = `${API_URL}movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`;
        fetch(endPoint)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({
                    loading: false,
                    movies: res.results
                });
            })
            .catch(error => console.log('Error while fetching movie details', error));
    }

    render(){
        if(!this.state.movies.length) return <div></div>;
        return (
            <div className="similarMovies-container">
                <div className="similarMovies-item-title">{this.props.tag}</div>
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
      
                {
                    this.state.movies.map(movie => (
                        <Link to={{
                            pathname: `/${movie.id}`, 
                            itemName: `${movie.title}`
                        }}     
                        key={movie.id}             
                        onClick={() => console.log("af")}      
                        >
                        
                            <div className="similarMovies-card" key={movie.id}> 
                            
                                <img src={movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : '/images/nothumbnail.jpg'} alt="Director" />
                                <p className="similarMovies-role">{movie.character ? movie.character : movie.job}</p>
                            </div>   
                            </Link>          
                ))
                }
                </Flickity>
            </div>
        );
    }
    
}

export default SimilarMovies;