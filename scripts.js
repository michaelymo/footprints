const been = L.map("mapid").setView([44, 12], 2);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: "pk.eyJ1Ijoicm9iaW5tZXRyYWwiLCJhIjoiY2pkMTI0bWVnMmV6dzM0bnNhZHBvMDBqeiJ9.Z0gZrvkth24hNkLkvRxg-g"
}).addTo(been);
