import React from 'react';
import './LoadMore.css';

const LoadMore = (props) => {
    return(
        <div className="loadMore-container" onClick={props.handleLoadMore}>
            <p>{props.text}</p>
        </div>
    );
}

export default LoadMore;