import React from 'react';
import './LoadMore.css';

const LoadMore = (props) => {
    return(
        <div className="loadMore-container" onClick={props.handleLoadMore}>
            <img src={props.image} alt="loadmore" />
        </div>
    );
}

export default LoadMore;