import React, {Component}  from 'react';
import YouTube from 'react-youtube';
import {API_URL} from '../../../conifg';
import './VideoPlayer.css';

class VideoPlayer extends Component {

    state = {
        videoId: null
    }

    componentDidMount(){
        let endPoint = `${API_URL}movie/${this.props.movieId}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
        this.fetchItems(endPoint);
    }

    fetchItems = (endPoint) => {
        fetch(endPoint)
            .then(res => res.json())
            .then(res => {
                console.log("VP", res);
                let vid = [];
                if(res.results && res.results.length > 0){
                    vid = res.results.filter(m => m.site === "YouTube");
                }
                vid = vid.slice(0, 1);
                if(vid.length > 0){
                    this.setState({
                        videoId: vid[0].key
                    })
                }
            });
    }

    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }

    render(){
        const opts = {
            height: '390',
            width: '640',
            playerVars: { 
                autoplay: 0
            }
        };

        return(
            <div className="videoPlayer-container">
                <div className="movieInfo-item-title">VIDEO</div>
                <YouTube
                    videoId={this.state.videoId}
                    opts={this.props.opts ? this.props.opts : opts}
                    onReady={this._onReady}
                />
            </div>
        );
    }
    
}

export default VideoPlayer;