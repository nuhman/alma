import React ,{Component} from 'react';
import './Footer.css';

class Footer extends Component {
    state = {

    }
    render(){
        return(
            <div className="footer-container">
                    <footer>
                        <p>Powered by <a target="_blank" rel="noopener noreferrer" href="https://www.themoviedb.org/en">TMDB</a></p>
                        <p>Find me on <a target="_blank" rel="noopener noreferrer" href="https://github.com/nuhman/">Github</a> <img src="https://image.flaticon.com/icons/svg/148/148836.svg" alt="love_logo" /></p>
                    </footer>
            </div>
        );
    }
}

export default Footer;