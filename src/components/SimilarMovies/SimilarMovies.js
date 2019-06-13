import React, {Component} from 'react';
import {Link, BrowserRouter } from 'react-router-dom';
import {API_URL, API_KEY} from '../../conifg';
import { IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../conifg';

import './SimilarMovies.css';

class SimilarMovies extends Component {

    state = {
        movies: [],
        loading: false
    };

    componentDidMount(){
        this.setState({
            loading: true
        });
        this.getSimilarMovies(this.props.movieId);
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
        return (
            <div className="similarMovies-container">
                <div className="similarMovies-item-title">YOU MAY ALSO LIKE THIS</div>
                {
                    this.state.movies.map(movie => (
                        
                            <div className="similarMovies-card" key={movie.id}> 
                            <Link to={{
                            pathname: `/${movie.id}`, 
                            itemName: `${movie.title}`
                        }}                  
                        onClick={() => console.log("af")}      
                        >
                                <img src={movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : './images/nothumbnail.jpg'} alt="Director" />
                                </Link>
                            </div>            
                ))
                }
            </div>
        );
    }
    
}

export default SimilarMovies;