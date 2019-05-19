import React ,{Component} from 'react';
import './Home.css';

import WelcomeImage from '../WelcomeImage/WelcomeImage';
import SearchBar from '../SearchBar/SearchBar';
import Grid from '../Grid/Grid';
import Thumbnail from '../Thumbnail/Thumbnail';
import LoadMore from '../LoadMore/LoadMore';
import Spinner from '../Spinner/Spinner';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../conifg';

class Home extends Component {
    state = {
        movies: [],
        searchTerm: '',
        welcomeImage: null,
        loading: false,
        currentPage: 0,
        totalPages: 0
    }

    componentDidMount(){
        this.setState({
            loading: true
        });
        const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        this.fetchItems(endPoint);
    }

    fetchItems = (endPoint) => {
        fetch(endPoint)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({
                    movies: [...this.state.movies, ...res.results],
                    welcomeImage: this.state.welcomeImage || res.results[0],
                    loading: false,
                    currentPage: res.page,
                    totalPages: res.total_pages
                })
            });
    };

    loadMore = () => {
        //TODO: validate searchTerm

        let endPoint = '';
        this.setState({
            loading: true
        });
        if(this.state.searchTerm === ''){
            endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage + 1}`;
        } else {
            endPoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${this.state.searchTerm}&page=${this.state.currentPage + 1}`;
        }
        this.fetchItems(endPoint);               
    }

    render(){
        return(
            <div>
                <WelcomeImage />
                <SearchBar />
                <Grid />
                <Thumbnail />
                <Spinner />
                <LoadMore />
            </div>
        );
    }
}

export default Home;