import React  from 'react';
import './WelcomeImage.css';

const WelcomeImage = (props) => {
    return (
        <div className="welcomeImage-container"
            style={{
                background: `linear-gradient(180deg,rgba(15, 32, 39,0.4),rgba(44, 83, 100,0.8)), url('${props.image}') no-repeat center center fixed / cover,  #1c1c1c`
            }}
        >
            <div className="welcomeImage-content">
                <div className="welcomeImage-text">
                    <h1>{props.title}</h1>
                    <p>{props.text}</p>
                </div>
            </div>
        </div>
    );
}

export default WelcomeImage;