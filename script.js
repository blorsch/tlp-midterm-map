let map;

function initMap() {
  sanrafael = {lat: 37.97, lng: -122.535};
  map = new google.maps.Map(document.getElementById("map"), {
    center: sanrafael,
    zoom: 10,
  });
}