import React ,{Component} from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

class Header extends Component {
    state = {

    }
    render(){
        return(
            <div className="header-container">
                <Link to="/" className="header-link">
                    <header>
                        <img src="/images/popcorn.png" alt="rmdb-logo" />
                        <h1>rmdb</h1>
                    </header>
                </Link>
            </div>
        );
    }
}

export default Header;