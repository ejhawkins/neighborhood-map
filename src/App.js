import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { load_google_maps,load_places} from './utils.js'

class App extends Component {

constructor(props){
  super(props);
  this.state = {
    query: ''
  }
  this.listItemClick = this.listItemClick.bind(this);
}


componentDidMount(){
  let googleMapsPromise = load_google_maps();
  let placesPromise = load_places();


  Promise.all([
    googleMapsPromise,
    placesPromise

  ]).then(values => {
    // Set the variables
    let google = values[0];
    this.venues = values[1].response.venues;
    this.google = values;
    this.markers = [];
    this.items = [];
    // TO Do load products that you can buy off the app.

    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 9,
      scrollwheel: true,
      center: {lat: this.venues[0].location.lat, lng: this.venues[0].location.lng}
    });
    this.infowindow = new google.maps.InfoWindow();
    // Set the Marker
    this.venues.forEach(venue => {
      let marker = new google.maps.Marker({
        position: {lat: venue.location.lat, lng: venue.location.lng},
        map: this.map,
        venue: venue,
        id: venue.id,
        name: venue.name,
        animation:  google.maps.Animation.DROP
      });
 
      marker.addListener('click', () => {
      	if(marker.getAnimation() !== null) {marker.setAnimation(null);}
      	else {marker.setAnimation(google.maps.Animation.BOUNCE);}
      	setTimeout(() => {marker.setAnimation(null)}, 1500);
      });
      // Set the info Window
      google.maps.event.addListener(marker, 'click', () => {
      	this.infowindow.setContent(marker.name);
      	this.map.setZoom(13);
      	this.map.setCenter(marker.position);
      	this.infowindow.open(this.map, marker)
      	this.map.panBy(0, -125);
      })
      this.markers.push(marker);
   

    });

    this.setState({ filteredVenues: this.venues});


  })
}

filterVenues(query){
	let f = this.venues.filter(venue => venue.name.toLowerCase().includes(query.toLowerCase()));
	
	this.markers.forEach(marker => {
		marker.name.toLowerCase().includes(query.toLowerCase()) == true ?
		marker.setVisible(true) :
		marker.setVisible(false);
	});

	this.setState({filteredVenues: f, query})
}

listItemClick = (venue) => {
	let marker = this.markers.filter(m => m.id === venue.id)[0];
	this.infowindow.setContent(marker.name);
    this.map.setZoom(13);
    this.map.setCenter(marker.position);
    this.infowindow.open(this.map, marker)
    this.map.panBy(0, -125);
    setTimeout(() => {marker.setAnimation(null)}, 1500);
}



  render() {
    return (
      <div>
      	<h1>sellOut</h1> 
      	<input value={this.props.query} onChange={(e) => {this.filterVenues(e.target.value)}} placeholder="Search items" />
        <div id="map">
        </div>
        <div id="sidebar">
         
       	  <br />
       	  <div>
       	  <h2>The Shopping Centers of Douglasville</h2>
       	  {
       	  	this.state.filteredVenues && this.state.filteredVenues.length > 0 && this.state.filteredVenues.map((venue,index) => (
       	  			<div key={index} className="venue-item" onClick={()=> {this.listItemClick(venue)}} >
       	  				{venue.name}
       	  			</div>
       	  		)
       	  	)
       	  }
       	  </div>
        </div>
      </div>  
    );
  }
}

export default App;
