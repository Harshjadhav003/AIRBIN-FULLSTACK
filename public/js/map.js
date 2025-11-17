const mapToken = document.getElementById('mapToken').value;
const coordinatesString = document.getElementById('map').dataset.coordinates;
const coordinates = JSON.parse(coordinatesString);

// Initialize map
const map = L.map('map').setView(coordinates, 9); // Use coordinates and a suitable zoom level

// Mapbox Tile layer
L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapToken}`, {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.mapbox.com/">Mapbox</a> contributors',
    id: 'mapbox/streets-v11', // You can choose a different style, e.g., 'mapbox/satellite-v9'
}).addTo(map);

// Add marker
const icon = L.icon({
  iconUrl: '/location.png', // change path if needed
  iconSize: [35, 45],
  iconAnchor: [17, 45]
});

L.marker(coordinates, {icon}).addTo(map)
  .bindPopup("Exact Location will be provided after booking") // Customize popup text
  .openPopup();