import React ,{Component} from 'react';
import './Header.css';

class Header extends Component {
    state = {

    }
    render(){
        return(
            <div className="header_container">
                <header>
                    <img src="./images/popcorn.png" alt="rmdb-logo" />
                    <h1>rmdb</h1>
                </header>
            </div>
        );
    }
}

export default Header;