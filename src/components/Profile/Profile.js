import React, {Component} from 'react';
import {API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE} from '../../conifg';
import Navigation from '../Navigation/Navigation';
import './Profile.css';

class Profile extends Component {

  constructor(props){

    super(props);

    this.state = {
      app: "as",
      person: {},
      gallery: []
    }
  }

  componentDidMount(){
    fetch(`${API_URL}person/${this.props.match.params.itemId}?api_key=${API_KEY}&language=en-US`)
    .then(res => res.json())
    .then(res => this.setState({
      person: res
    }, console.log("Profile.js, Profile", res))); 

    /*fetch(`${API_URL}person/${this.props.id}/images?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(res => this.setState({
      gallery: res.profiles
    }, console.log("Profile.js, Gallery", res))); */


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
      <div className="profile_container">
        {/* <Navigation movieName={"Go Back"}/> */}
        <img className="profile_image" src={`${IMAGE_BASE_URL}${POSTER_SIZE}${this.state.person.profile_path}`} alt="profile_image" />  
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
          
          {this.state.person.also_known_as ? (
            <div className="profile_details_block">
              <p className="profile_details_heading">Also known as</p>
              <div className="profile_details_value">{this.getAlternateNames()}</div>
              </div> 
          ) : null }

          {this.state.person.also_known_as ? (
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
    );
  }  
}

export default Profile;
