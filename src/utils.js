export function load_google_maps() {
  return new Promise(function(resolve, reject) {
    // define the global callback that will run when google maps is loaded
    window.resolveGoogleMapsPromise = function() {
      // resolve the google object
      resolve(window.google);
      // delete the global callback to tidy up since it is no longer needed
      delete window.resolveGoogleMapsPromise;
    }
    // Now, Load the Google Maps API
    const script = document.createElement("script");
    const API_KEY = 'AIzaSyD1MksqANHhE8jZayYBIysqFIn4sk0K6JQ';
    script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${API_KEY}&callback=resolveGoogleMapsPromise`;
    script.async = true;
    document.body.appendChild(script);
  });
}

export function load_places(){
  let city = 'Douglasville, GA';
  let query = 'Shopping';
  let version = '20160108'
  var apiURL = 'https://api.foursquare.com/v2/venues/search?client_id=QSONAEFVY2IEDP210WA1ZEQ0EAL3YI3PBBMARZXT003OFCO3&client_secret=4C3DVOAKAAAFKFED2KQ2KTNC3GDCZZLR1O5OAEPMPVRKALD1&limit=50&near=' + city + '&query=' + query + '' + '&v=' + version;
  return fetch(apiURL).then(resp => resp.json())
}

/* export function selling_items() {

var items = 'https://beautifullytwistedmind.net/Udacity/ebay-JSON.json';
return fetch(items).then(resp => resp.json())

}*/
