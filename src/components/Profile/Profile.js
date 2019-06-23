import React, {Component} from 'react';
import {API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE} from '../../conifg';
import SimilarMovies from '../SimilarMovies/SimilarMovies';
import './Profile.css';

class Profile extends Component {

  constructor(props){

    super(props);

    this.state = {
      app: "as",
      person: {},
      gallery: [],
      social: {},
      cast: [],
      crew: []
    }
  }

  componentDidMount(){
    fetch(`${API_URL}person/${this.props.match.params.itemId}?api_key=${API_KEY}&language=en-US`)
    .then(res => res.json())
    .then(res => this.setState({
      person: res
    }, () => {
      document.title = this.state.person.name + " | Alma";
      console.log("Profile.js, Profile", res)    
    })); 

    /*fetch(`${API_URL}person/${this.props.id}/images?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(res => this.setState({
      gallery: res.profiles
    }, console.log("Profile.js, Gallery", res))); */

    fetch(`${API_URL}person/${this.props.match.params.itemId}/external_ids?api_key=${API_KEY}&language=en-US`)
    .then(res => res.json())
    .then(res => this.setState({
      social: res
    }, console.log("Profile.js, Profile", res))); 

    fetch(`${API_URL}person/${this.props.match.params.itemId}/movie_credits?api_key=${API_KEY}&language=en-US`)
    .then(res => res.json())
    .then(res => this.setState({
      cast: res.cast.slice(0, 10),
      crew: res.crew.slice(0, 10)
    }, console.log("Profile.js, CAST", res.cast))); 


  }  

  getAlternateNames(){
    if(!this.state.person.also_known_as) return;
    return this.state.person.also_known_as.map((name, i) => <p key={name + i}>{name}</p>);
  }

  getImages(){
    let images = this.state.gallery.map(image => {
      return (
        <img src={`${IMAGE_BASE_URL}${POSTER_SIZE}${image.file_path}`} alt="profile_image" />
      );
    });

    return images.slice(0, 6);
  }



  render(){
    return(
      <div>
      <div className="profile_container">
        {/* <Navigation movieName={"Go Back"}/> */}
        <img className="profile_image" src={`${IMAGE_BASE_URL}${POSTER_SIZE}${this.state.person.profile_path}`} alt="profile_image" />  

        <div className="profile_social">
        
            {this.state.social.facebook_id ? <a  target="_blank" href={`https://facebook.com/${this.state.social.facebook_id}`} ><img src="https://image.flaticon.com/icons/svg/220/220200.svg" /></a> : null }

            {this.state.social.twitter_id ? <a  target="_blank" href={`https://twitter.com/${this.state.social.twitter_id}`}><img src="https://image.flaticon.com/icons/svg/1409/1409937.svg" /></a> : null }

            {this.state.social.instagram_id ? <a  target="_blank" href={`https://instagram.com/${this.state.social.instagram_id}`}><img src="https://image.flaticon.com/icons/svg/1409/1409946.svg" /></a> : null }

            {this.state.social.imdb_id ? <a  target="_blank" href={`https://imdb.com/name/${this.state.social.imdb_id}`}><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/800px-IMDB_Logo_2016.svg.png" /></a> : null }

        </div>


        <div className="profile_details">
          <div className="profile_details_block">
            <p className="profile_details_heading">Name</p>
            <p className="profile_details_value">{this.state.person.name}</p>
          </div>
          {this.state.person.birthday ? (
            <div className="profile_details_block">
              <p className="profile_details_heading">Birthday</p>
              <p className="profile_details_value">{this.state.person.birthday}</p>
            </div>   
          ): null }
          {this.state.person.deathday ? (
            <div className="profile_details_block">
              <p className="profile_details_heading">Deathday</p>
              <p className="profile_details_value">{this.state.person.deathday}</p>
            </div>    
          ): null }    
          {this.state.person.place_of_birth ? (
            <div className="profile_details_block">
              <p className="profile_details_heading">Place of Birth</p>
              <p className="profile_details_value">{this.state.person.place_of_birth}</p>
            </div>
          ): null }
          
          {this.state.person.also_known_as ? (this.state.person.also_known_as.length > 0 ?  (
            <div className="profile_details_block">
              <p className="profile_details_heading">Also known as</p>
              <div className="profile_details_value">{this.getAlternateNames()}</div>
              </div> 
          ) : null) : null}

          {this.state.person.biography ? (
            <div className="profile_details_block">
              <p className="profile_details_heading">Bio</p>
              <p className="profile_details_value">{this.state.person.biography}</p>
              </div> 
          ) : null }  

          {/* {this.state.gallery ? (
            <div className="profile_details_block">
              <p className="profile_details_heading">Gallery</p>
              <div className="profile_details_gallery">{this.getImages()}</div>
              </div> 
          ) : null }   */}

          </div>    

          

      </div>
      {this.state.crew.length > 0 ? <SimilarMovies movies={this.state.crew} tag="MOST POPULAR AS CREW" /> : <div></div> }
      {this.state.cast.length > 0 ? <SimilarMovies movies={this.state.cast} tag="MOST POPULAR AS CAST" /> : <div></div> }
      </div>
    );
  }  
}

export default Profile;
