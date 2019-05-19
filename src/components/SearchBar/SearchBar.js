import React ,{Component} from 'react';
import './SearchBar.css';

class SearchBar extends Component {
    state = {
        value: '',
        placeholder: 'start typing here to search'
    }

    timeout = null;

    handleSearch = (e) => {
        this.setState({
            value: e.target.value
        });
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.props.handleSearch(this.state.value);
        }, 1000);
    }

    render(){
        return(
            <div className="searchBar-container">
                <div className="searchBar-content">
                    <input type="text" 
                        id="icon"
                        value={this.state.value}
                        onChange={this.handleSearch}
                        placeholder={this.state.placeholder} />
                </div>
            </div>
        );
    }
}

export default SearchBar;