import React from 'react';

import './Rating.css';


const getRating = (rating) => {
    return rating*10;
}

const Rating = (props) => {
    return(
        <div className="rating-box">
            <div className='rating-container'>
                <div className='rating-stars'>
                    <span className='rating' style={{width: (props.rating ? `${getRating(props.rating)}%` : '0%')}}></span>
                </div>
            </div>

            <svg width='0' height='0'>
                <defs>
                    <clipPath id='svgStars' clipPathUnits = 'objectBoundingBox'>
                        <polygon points=".80 .073 .738 .118 .762 .19 .70 .145 .638 .19 .662 .118 .60 .073 .538 .118 .562 .19 .50 .145 .438 .19 .462 .118 .40 .073 .338 .118 .362 .19 .30 .145 .238 .19 .262 .118 .20 .073 .138 .118 .162 .19 .10 .145 .038 .19 .062 .118 0 .073 .076 .073 .10 0 .124 .073 .276 .073 .30 0 .324 .073 .476 .073 .50 0 .524 .073 .676 .073 .70 0 .724 .073 .876 .073 .90 0 .924 .073 1 .073 .938 .118 .962 .19 .90 .145 .838 .19 .862 .118 "/>
                    </clipPath>
                </defs>
            </svg>
        </div>
    );
}

export default Rating;