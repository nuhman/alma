import React from 'react';

import './MovieInfoBar.css';


const convertMinToHoursAndMin = (min) => {
    console.log("min is", min);
    let hours = (min / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    if(!min)
        return "N.A";
    if(rhours < 1)
        return rminutes + " minutes";
    if(rhours > 1)
        return rhours + " hours " + (rminutes > 0 ? (rminutes > 1 ? "and " + rminutes + " minutes" : "and" + rminutes + " minute") : "");
    return rhours + " hour and " + (rminutes > 0 ? (rminutes > 1 ? "and " + rminutes + " minutes" : "and" + rminutes + " minute") : "");
}

const convertCurrency = (labelValue) => {

    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9

    ? (Math.round((Math.abs(Number(labelValue)) / 1.0e+9) * 100) / 100 ) + "B"
    // Six Zeroes for Millions
    : Math.abs(Number(labelValue)) >= 1.0e+6

    ? (Math.round((Math.abs(Number(labelValue)) / 1.0e+6) * 100) / 100)  + "M"
    // Three Zeroes for Thousands
    : Math.abs(Number(labelValue)) >= 1.0e+3

    ? (Math.round((Math.abs(Number(labelValue)) / 1.0e+3) * 100) / 100)  + "K"

    : Math.abs(Number(labelValue));

}


const validateBudgetOrRevenue = (curr) => {
    if(!curr || Number(curr) <= 0)
        return "N.A";
    return convertCurrency(curr) + " $";
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