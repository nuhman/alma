import React ,{Component} from 'react';
import './Home.css';

import WelcomeImage from '../WelcomeImage/WelcomeImage';
import SearchBar from '../SearchBar/SearchBar';
import Grid from '../Grid/Grid';
import Thumbnail from '../Thumbnail/Thumbnail';
import LoadMore from '../LoadMore/LoadMore';
import Spinner from '../Spinner/Spinner';

class Home extends Component {
    state = {

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