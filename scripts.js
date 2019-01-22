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

// HERE, RUN THE GEOJSON OBJECT AGAINST AN OBJECT OF COUNTRIES VISITED

// fill style
const style = {
    fillColor: "lightgreen",
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "2",
    fillOpacity: 0.7
}

// fetch geojson countries geometry
fetch("./countries.geojson")
  .then(response => {
    return response.json();
  }).then(data => {
    L.geoJson(data, {style: style}).addTo(map);
  }).catch(err => {
    console.log("There was an error.");
  });
