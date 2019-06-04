import React ,{Component} from 'react';
import './Home.css';

import WelcomeImage from '../WelcomeImage/WelcomeImage';
import SearchBar from '../SearchBar/SearchBar';
import Grid from '../Grid/Grid';
import Thumbnail from '../Thumbnail/Thumbnail';
import LoadMore from '../LoadMore/LoadMore';
import Spinner from '../Spinner/Spinner';
import NoResults from '../NoResults/NoResults';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../conifg';

class Home extends Component {

    // set the state
    state = {
        movies: [],
        searchTerm: '',
        welcomeImage: null,
        loading: false,
        currentPage: 0,
        totalPages: 0
    }

    componentDidMount(){
        
        // this run after the page is loaded
        
        this.setState({
            loading: true // used to show the loading spinner gif
        });

        // popular movies url
        const endPoint = this.getEndPoint("POPULAR");
        this.fetchItems(endPoint);
    }

    handleSearch = (searchTerm) => {
        
        let endPoint;

        if(searchTerm === ''){
            endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US`;
        } else {
            endPoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
        }
        console.log(searchTerm);
        this.setState({
            movies: [],
            loading: true,
            searchTerm
        });
        this.fetchItems(endPoint);
    }

    fetchItems = (endPoint) => {
        fetch(endPoint)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({
                    movies: [...this.state.movies, ...res.results], // concatenate the existing movies with the results
                    welcomeImage: this.state.welcomeImage || {
                        backdrop_path: res.results[1].backdrop_path,
                        overview: res.results[1].overview,
                        title: res.results[1].title
                    },
                    loading: false, // used to remove spinner gif and instead show the results
                    currentPage: res.page, // get the current page of the result
                    totalPages: res.total_pages // get total pages for results
                });
            });
    };

    loadMore = () => {
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

    getEndPoint = (term) => {
        switch(term){
            case "POPULAR":
                return `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
            case "WELCOME_IMAGE":
                return `${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.state.welcomeImage.backdrop_path}`;
            default:
                return null;
        }
    }

    getMovies = () => {
        let movies = this.state.movies.map((ele, i) => {
            return <Thumbnail 
                        key={ele.id}
                        clickable={true}
                        image={ele.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${ele.poster_path}` : './images/nothumbnail.jpg'}
                        itemId={ele.id}
                        itemName={ele.original_title}

                        />
        });
        if(this.state.loading){
            movies.push(<Spinner />);
        }
        else if(this.state.movies.length && (this.state.currentPage < this.state.totalPages) && !this.state.loading) {
            movies.push(
                <LoadMore  image={'./images/loadmore.jpg'} handleLoadMore={this.loadMore}/>
            );
        }
        
        return movies;
    }

    render(){
        return(
            <div className="home-container">
                {this.state.welcomeImage ?
                    <div className="welcomeImage-searchBar-container">
                        <WelcomeImage 
                            image={this.getEndPoint("WELCOME_IMAGE")}
                            //image='https://image.tmdb.org/t/p/w1280/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg'
                            title={this.state.welcomeImage.title}
                            //title='Avengers: End Game'
                            text={this.state.welcomeImage.overview}
                            //text="After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store."
                        />
                        <SearchBar handleSearch={this.handleSearch}/>
                    </div>
                : null}
                <div className="home-grid-container">
                    <Grid 
                        header={this.state.searchTerm ? 'Search Results' : 'Popular Movies'}
                        loading={this.state.loading}                        
                    >
                        {
                            this.getMovies()
                        }
                    </Grid>
                </div>
                {/* {this.state.loading ? <Spinner /> : null}
                {(this.state.movies.length && this.state.currentPage < this.state.totalPages && !this.state.loading) ? 
                    <LoadMore  image={'./images/loadmore.jpg'} handleLoadMore={this.loadMore}/> : null
                } */}
                {!this.state.loading && !this.state.movies.length ? <NoResults image="https://image.flaticon.com/icons/svg/138/138366.svg" text="Nothing here fellas. Move on!"/> : null}
                                
            </div>
        );
    }
}

export default Home;