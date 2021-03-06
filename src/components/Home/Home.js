import React ,{Component} from 'react';
import './Home.css';

import WelcomeImage from '../WelcomeImage/WelcomeImage';
import SearchBar from '../SearchBar/SearchBar';
import Grid from '../Grid/Grid';
import Thumbnail from '../Thumbnail/Thumbnail';
import LoadMore from '../LoadMore/LoadMore';
import Spinner from '../Spinner/Spinner';
import NoResults from '../NoResults/NoResults';
import { API_URL, IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../conifg';
import { transcode } from 'buffer';

class Home extends Component {

    // set the state
    state = {
        movies: [],
        nowPlayingMovies: [],
        topRatedMovies: [],
        searchTerm: '',
        welcomeImage: null,
        moviesLoading: false,
        nowPlayingLoading: false,
        topRatedLoading: false,
        searchOnProgress: false,
        moviesCurrentPage: 0,
        moviesTotalPages: 0,
        topRatedTotalPages: 0,
        topRatedCurrentPage: 0,
        nowPlayingCurrentPage: 0,
        nowPlayingTotalPages: 0,
        gridStartingPositon_Popular: 0,
        gridStartingPositon_NowPlaying: 0,
        gridStartingPositon_TopRated: 0, 
        
    }

    componentDidMount(){
        
        // this run after the page is loaded
        
        document.title = 'Alma | Movie Database';

        this.setState({
            moviesLoading: true, // used to show the loading spinner gif,
            nowPlayingLoading: true,
            topRatedLoading: true
        });

        // popular movies url
        let endPoint = this.getEndPoint("POPULAR");
        this.fetchItems(endPoint, "POPULAR");
        endPoint = this.getEndPoint("NOW_PLAYING");
        this.fetchItems(endPoint, "NOW_PLAYING");
        endPoint = this.getEndPoint("TOP_RATED");
        this.fetchItems(endPoint, "TOP_RATED");
    }

    handleSearch = (searchTerm) => {
        
        let endPoint;

        this.setState({
            movies: [],
            nowPlayingMovies: [],
            topRatedMovies: [],
            searchOnProgress: false,
            topRatedLoading: true,
            moviesLoading: true,
            nowPlayingLoading: true,
            searchTerm
        });

        if(searchTerm === ''){
            endPoint = this.getEndPoint("POPULAR"); //`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US`;
            this.fetchItems(endPoint, "POPULAR");
            endPoint = this.getEndPoint("NOW_PLAYING");
            this.fetchItems(endPoint, "NOW_PLAYING");
            endPoint = this.getEndPoint("TOP_RATED");
            this.fetchItems(endPoint, "TOP_RATED");
        } else {
            endPoint = `${API_URL}search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchTerm}`;
            this.fetchItems(endPoint, "SEARCH");
        }
        console.log(searchTerm);
        
        //this.fetchItems(endPoint);
    }

    fetchItems = (endPoint, term) => {
        fetch(endPoint)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if(term === "POPULAR") {
                    this.setState({
                        movies: [...this.state.movies, ...res.results], // concatenate the existing movies with the results
                        welcomeImage: this.state.welcomeImage || {
                            backdrop_path: res.results[1].backdrop_path,
                            overview: res.results[1].overview,
                            title: res.results[1].title
                        },
                        moviesLoading: false, // used to remove spinner gif and instead show the results
                        moviesCurrentPage: res.page, // get the current page of the result
                        moviesTotalPages: res.total_pages // get total pages for results
                    });
                } else if(term === "NOW_PLAYING") {
                    this.setState({
                        nowPlayingMovies: [...this.state.nowPlayingMovies, ...res.results.reverse()], // concatenate the existing movies with the results
                        nowPlayingLoading: false, // used to remove spinner gif and instead show the results
                        nowPlayingCurrentPage: res.page, // get the current page of the result
                        nowPlayingTotalPages: res.total_pages // get total pages for results
                    });
                } else if(term === "SEARCH") {
                    this.setState({
                        movies: this.state.searchOnProgress ? [...this.state.movies, ...res.results] : [...res.results],
                        nowPlayingMovies: [], // concatenate the existing movies with the results
                        topRatedMovies: [],
                        moviesLoading: false, // used to remove spinner gif and instead show the results
                        moviesCurrentPage: res.page, // get the current page of the result
                        moviesTotalPages: res.total_pages // get total pages for results
                    });
                } else if(term === "TOP_RATED") {
                    this.setState({
                        topRatedMovies: [...this.state.topRatedMovies, ...res.results],
                        topRatedLoading: false,
                        topRatedCurrentPage: res.page, // get the current page of the result
                        topRatedTotalPages: res.total_pages // get total pages for results
                    });
                }
                
            });
    };

    loadMore = (term) => {
        let endPoint = '';
        // this.setState({
        //     moviesLoading: true,
        //     nowPlayingLoading: true
        // });
        
        if(this.state.searchTerm === ''){
            switch(term) {
                case "POPULAR":
                        this.setState({moviesLoading: true});
                        endPoint = `${API_URL}movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${this.state.moviesCurrentPage + 1}`;
                        this.setState({
                            gridStartingPositon_Popular: this.state.movies.length-1
                        });
                        this.fetchItems(endPoint, "POPULAR");   
                        break;
                case "NOW_PLAYING":
                        this.setState({nowPlayingLoading: true});
                        endPoint = `${API_URL}movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${this.state.nowPlayingCurrentPage + 1}&region=IN`;
                        this.setState({
                            gridStartingPositon_NowPlaying: this.state.nowPlayingMovies.length-1
                        });
                        this.fetchItems(endPoint, "NOW_PLAYING");  
                        break;
                case "TOP_RATED":
                        this.setState({topRatedLoading: true});
                        endPoint = `${API_URL}movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${this.state.topRatedCurrentPage + 1}`;
                        this.setState({
                            gridStartingPositon_TopRated: this.state.topRatedMovies.length-1
                        });
                        this.fetchItems(endPoint, "TOP_RATED");  
                        break;
                default:
                    break;
            }
            
        } else {
            this.setState({moviesLoading: true, searchOnProgress: true});
            endPoint = `${API_URL}search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${this.state.searchTerm}&page=${this.state.moviesCurrentPage + 1}`;
            this.fetchItems(endPoint, "SEARCH");
        }
                       
    }

    getEndPoint = (term) => {
        switch(term){
            case "POPULAR":
                return `${API_URL}movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;
            case "NOW_PLAYING":
                return `${API_URL}movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&region=IN`;
            case "TOP_RATED":
                return `${API_URL}movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;
            case "WELCOME_IMAGE":
                return `${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.state.welcomeImage.backdrop_path}`;
            default:
                return null;
        }
    }

    getMovies = (term) => {
        let movies = [];
        if(term === "POPULAR") {
            movies = this.state.movies.map((ele, i) => {
                if(!ele.id) { // if movie id is not there, 
                    return null;
                }
                return <Thumbnail 
                            key={ele.id}
                            clickable={true}
                            image={ele.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${ele.poster_path}` : '/images/nothumbnail.jpg'}
                            itemId={ele.id}
                            itemName={ele.original_title}
    
                            />
            });
            movies = movies.filter(ele => ele !== null);
            if(this.state.moviesLoading){
                movies.push(<Spinner key="spinner_popular" />);
            }
            else if(this.state.movies.length && (this.state.moviesCurrentPage < this.state.moviesTotalPages) && !this.state.moviesLoading) {
                movies.push(
                    <LoadMore key="loading_popular" image={'/images/loadmore.jpg'} handleLoadMore={() => this.loadMore("POPULAR")}/>
                );
            }
        } else if(term === "NOW_PLAYING") {
            movies = this.state.nowPlayingMovies.map((ele, i) => {
                if(!ele.id) {
                    return null;
                }
                return <Thumbnail 
                            key={ele.id}
                            clickable={true}
                            image={ele.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${ele.poster_path}` : '/images/nothumbnail.jpg'}
                            itemId={ele.id}
                            itemName={ele.original_title}
    
                            />
            });
            movies = movies.filter(ele => ele !== null);
            if(this.state.nowPlayingLoading){
                movies.push(<Spinner key="spinner_nowplaying"/>);
            }
            else if(this.state.nowPlayingMovies.length && (this.state.nowPlayingCurrentPage < this.state.nowPlayingTotalPages) && !this.state.nowPlayingLoading) {
                movies.push(
                    <LoadMore key="loading_nowplaying"  image={'/images/loadmore.jpg'} handleLoadMore={() => this.loadMore("NOW_PLAYING")}/>
                );
            }
        } else if(term === "TOP_RATED") {
            console.log("HERE IS... ", this.state.topRatedMovies);
            movies = this.state.topRatedMovies.map((ele, i) => {
                if(!ele.id) {
                    return null;
                }
                    return <Thumbnail 
                                key={ele.id}
                                clickable={true}
                                image={ele.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${ele.poster_path}` : '/images/nothumbnail.jpg'}
                                itemId={ele.id}
                                itemName={ele.original_title}
                                />
            });
            movies = movies.filter(ele => ele !== null);
            if(this.state.topRatedLoading){
                movies.push(<Spinner key="spinner_toprated"/>);
            }
            else if(this.state.topRatedMovies.length && (this.state.topRatedCurrentPage < this.state.topRatedTotalPages) && !this.state.topRatedLoading) {
                movies.push(
                    <LoadMore key="loading_toprated"  image={'/images/loadmore.jpg'} handleLoadMore={() => this.loadMore("TOP_RATED")}/>
                );
            }
        }
        
        
        
        return movies;
    }

    render(){
        return(
            <div className="home-container">
                {this.state.welcomeImage ?
                    <div className="welcomeImage-searchBar-container">
                        <WelcomeImage 
                            image={this.state.welcomeImage.backdrop_path ? this.getEndPoint("WELCOME_IMAGE") : null}
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
                        loading={this.state.moviesLoading}         
                        gridStartingPos={this.state.gridStartingPositon_Popular}             
                    >
                        {
                            this.getMovies("POPULAR")
                        }
                    </Grid>
                </div>
                {!this.state.searchTerm ? 
                    <React.Fragment>
                        <div className="home-grid-container">
                            <Grid 
                                header={'Now Playing'}
                                loading={this.state.nowPlayingLoading} 
                                gridStartingPos={this.state.gridStartingPositon_NowPlaying}                        
                            >
                                {
                                    this.getMovies("NOW_PLAYING")
                                }
                            </Grid>
                        </div>
                        <div className="home-grid-container">
                            <Grid 
                                header={'Top Rated'}      
                                loading={this.state.topRatedLoading}
                                gridStartingPos={this.state.gridStartingPositon_TopRated}                 
                            >
                                {
                                    this.getMovies("TOP_RATED")
                                }
                            </Grid>
                        </div>
                    </React.Fragment>
                : null}
                {/* {this.state.loading ? <Spinner /> : null}
                {(this.state.movies.length && this.state.moviesCurrentPage < this.state.moviesTotalPages && !this.state.loading) ? 
                    <LoadMore  image={'./images/loadmore.jpg'} handleLoadMore={this.loadMore}/> : null
                } */}
                {!this.state.moviesLoading && !this.state.movies.length ? <NoResults image="https://image.flaticon.com/icons/svg/138/138366.svg" text="Nothing here fellas. Move on!"/> : null}
                                
            </div>
        );
    }
}

export default Home;