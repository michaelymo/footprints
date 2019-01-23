// set default map view
const map = L.map("mapid").setView([44, 12], 2);

// mapbox public access token
const mapboxToken = "pk.eyJ1Ijoicm9iaW5tZXRyYWwiLCJhIjoiY2pkMTI0bWVnMmV6dzM0bnNhZHBvMDBqeiJ9.Z0gZrvkth24hNkLkvRxg-g";

// set tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=" + mapboxToken, {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, Imagery &copy; <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
}).addTo(map);

// define fill style
const style = {
  fillColor: "lightgreen",
  weight: 2,
  opacity: 1,
  color: "white",
  dashArray: "2",
  fillOpacity: 0.7
}

// fetch footprint json object
let footprintCountries = [];
fetch("./footprint.json")
  .then(response => {
    return response.json();
  }).then(json => {
    // make array of visited countries
    footprintCountries.push(...json.footprint);
    // call getGeometry function
    getGeometry(footprintCountries);
  }).catch(err => {
    console.log("There was an error while fetching the visited countries");
  });

// fetch geojson countries geometry
let allCountries = {};
function getGeometry(footprintCountries) {
  fetch("./countries.geojson")
    .then(response => {
      return response.json();
    }).then(json => {
      allCountries = Object.assign({}, json);
      filterCountries(allCountries, footprintCountries);
    }).catch(err => {
      console.log("There was an error while fetching the countries geometry.");
    });
}

// filter allCountries with footprintCountries
let filledCountries = []
function filterCountries(allCountries, footprintCountries) {
  // fileter with filter() and includes()
  filledCountries = allCountries.features.filter(country => footprintCountries.includes(country.properties.ISO_A3));
  // call populateMap function
  populateMap(filledCountries);
}

// populate map with final array and fill styles
let geojson;
function populateMap(filledCountries) {
  geojson = L.geoJson(filledCountries, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(map);
}

// listen for map events
function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
  });
}

// highlight on mouseover
function highlightFeature(e) {
  let layer = e.target;

  layer.setStyle({
    fillColor: "forestgreen",
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }

  info.update(layer.feature.properties.ADMIN);
}

// reset on mouseout
function resetHighlight(e) {
  // reset styles
  geojson.resetStyle(e.target);
  // reset info control
  info.update();
}

// show country name in an info control
// Leaflet controls: https://leafletjs.com/reference.html#control
let info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create("div", "info"); // create a div with a class "info"
  this.update();
  return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (hoveredCountry) {
  this._div.innerHTML = "<h4>J'ai voyagé dans X pays</h4>"
    +  (hoveredCountry ?
    "<strong>" + hoveredCountry + "</strong>"
    : "Survolez un pays");
};

info.addTo(map);
