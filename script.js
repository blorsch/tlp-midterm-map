let map;
const template = '<div class="content"><div class="header"><span class="name">{NAME}</span><span class="date">Est. {DATE}</span></div><div class="link"><a href="{LINK}">{LINK}</a></div><ul class="info">{POINTS}</ul>';  // I would do a DOM element if I had more time
const sanRafael = {lat: 37.97, lng: -122.535};
const blue = 'blue';
const red = 'red';
const purple = 'purple';

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: sanRafael,
    zoom: 4,
    styles: [  // dark mode
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      {
        elementType: "labels.text.stroke",
        stylers: [{ color: "#242f3e" }],
      },
      {
        elementType: "labels.text.fill",
        stylers: [{ color: "#746855" }],
      },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
      },
    ],
  });
  city('San Rafael', '6969', 'sanrafaelsomething.com', "It's cool--it's poppin'--I'm there lol--Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.".split('--'), sanRafael.lat, sanRafael.lng, purple);
}

function city_content(name, date, link, points_array) {
  return template.replace('{NAME}', name).replace('{DATE}', date).replace(/{LINK}/g, link).replace('{POINTS}', '<li>'+points_array.join('</li><li>')+'</li>')
}

function add_marker(lat, long, content, label, color) {
  const infowindow = new google.maps.InfoWindow({
    content: content,
  });
  const marker = new google.maps.Marker({
    position: {lat: lat, lng: long},
    map: map,
    title: label,
    icon: (color==='red'? 'red-dot.png' : (color==='blue'? 'blue-dot.png' : 'purple-dot.png'))
  });
  marker.addListener("click", () => {
    infowindow.open(map, marker);
  });
}

function city(name, date, link, points_array, lat, long, color) {
  add_marker(lat, long, city_content(name, date, link, points_array), name, color);
}