import React, {Component} from 'react';
import {API_URL, API_KEY} from '../../conifg';
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
    fetch(`https://api.themoviedb.org/3/person/${this.props.id}?api_key=1ebfe84eb3123c5430de798341cb6816&language=en-US`)
    .then(res => res.json())
    .then(res => this.setState({
      person: res
    }, console.log("P", res))); 

    fetch(`https://api.themoviedb.org/3/person/${this.props.id}/images?api_key=1ebfe84eb3123c5430de798341cb6816`)
    .then(res => res.json())
    .then(res => this.setState({
      gallery: res.profiles
    }, console.log("I", res))); 


  }  

  getAlternateNames(){
    if(!this.state.person.also_known_as) return;
    return this.state.person.also_known_as.map(name => <p>{name}</p>);
  }

  getImages(){
    let images = this.state.gallery.map(image => {
      return (
        <img src={`https://image.tmdb.org/t/p/original${image.file_path}`} />
      );
    });

    return images.slice(0, 6);
  }



  render(){
    return(
      <div className="profile_container">
        <img className="profile_image" src={`https://image.tmdb.org/t/p/original${this.state.person.profile_path}`} alt="profile_image" />  
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
          {this.state.person.birthday ? (
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
              <p className="profile_details_value">{this.getAlternateNames()}</p>
              </div> 
          ) : null }

          {this.state.person.also_known_as ? (
            <div className="profile_details_block">
              <p className="profile_details_heading">Bio</p>
              <p className="profile_details_value">{this.state.person.biography}</p>
              </div> 
          ) : null }  

          {this.state.gallery ? (
            <div className="profile_details_block">
              <p className="profile_details_heading">Gallery</p>
              <div className="profile_details_gallery">{this.getImages()}</div>
              </div> 
          ) : null }  

          </div>    

      </div>
    );
  }  
}

export default Profile;
