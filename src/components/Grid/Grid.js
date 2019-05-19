import React from 'react';
import './Grid.css';

const Grid = (props) => {

    const renderElements = () => {
        const elements = props.children.map( (ele, i) => {
            return(
                <div key={i} className="grid-element">
                    {ele}
                </div>
            );
        });
        return elements;
    }


    return(
        <div className="grid-container">
            <div className="grid-header">
                {props.header && !props.loading ? <h1>{props.header}</h1> : null}
            </div>
            <div className="grid-content">
                {renderElements()}
            </div>
        </div>
    );
}

export default Grid;