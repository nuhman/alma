import React from 'react';

import './MovieInfoBar.css';


const convertMinToHoursAndMin = (min) => {
    let hours = (min / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    if(rhours < 1)
        return rminutes + " minutes";
    if(rhours > 1)
        return rhours + " hours " + (rminutes > 0 ? (rminutes > 1 ? "and " + rminutes + " minutes" : "and" + rminutes + " minute") : "");
    return rhours + " hour and " + (rminutes > 0 ? (rminutes > 1 ? "and " + rminutes + " minutes" : "and" + rminutes + " minute") : "");
}


const validateBudgetOrRevenue = (curr) => {
    if(Number(curr) <= 0)
        return "N.A";
    return "$" + curr;
}

const MovieInfoBar = (props) => {
    return(
        <div className="movieInfoBar-container">
            <div className="movieInfoBar-duration">
                <img src="https://image.flaticon.com/icons/svg/148/148854.svg" alt="duration" />&nbsp;&nbsp;Duration: {convertMinToHoursAndMin(props.duration)}
            </div>
            <div className="movieInfoBar-budget">
            <img src="https://image.flaticon.com/icons/svg/138/138255.svg" alt="budget" />&nbsp;&nbsp;Budget: {validateBudgetOrRevenue(props.budget)}
            </div>
            <div className="movieInfoBar-revenue">
            <img src="https://image.flaticon.com/icons/svg/755/755195.svg" alt="revenue" />&nbsp;&nbsp;Revenue: {validateBudgetOrRevenue(props.revenue)}
            </div>
        </div>
    );
}

export default MovieInfoBar;