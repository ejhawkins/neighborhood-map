import GoogleApiComponent from './GoogleApiComponent.js';
import GoogleApi from './GoogleApi.js';
import Map from './Map.js';
import React, { Component } from 'react';
import {GoogleApiWrapper} from 'google-maps-react';


export class Container extends React.Component {
  render() {
  	// TODO New name
  	const style = {
      width: '100%',
      height: '100%'
    }

    if (!this.props.loaded) {
      
      return <div>Loading...</div>
      
    }
    console.log("Okay Erica", this.props.google)
    return (
      <div style={style}>
        <Map
          google={this.props.google}
          style={style}
          initialCenter={{
            lat: 40.854885,
            lng: -88.081807
          }}
          zoom={15}
        />
      </div>
       // GoogleApi will send a true function  once loaded. Using the this.props technique.
    )
  }
}
// The tricky part about using the async library is being able to depend on the API being available.

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB42onqniI58WI1v6bxDug37-HAEbsBldQ'
})(Container)
