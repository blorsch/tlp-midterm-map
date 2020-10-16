let map;
let is_dark_mode;

const template = '<div class="content{DARK-MODE}"><div class="header"><span class="name">{NAME}</span><span class="date">Est. {DATE}</span></div><div class="link"><a href="{LINK}">{LINK}</a></div><ul class="info">{POINTS}</ul>';  // I would do a DOM element if I had more time
const center = {lat: 35, lng: 0};

const dark_mode = [  // dark mode styles
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
];

function initMap() {
  is_dark_mode = (new Date().getHours() > 15 || new Date().getHours() < 9);
  if (is_dark_mode) {
    document.getElementById('legend').classList.add('dark-mode');
  }
  map = new google.maps.Map(document.getElementById("map"), {
    center: center,
    zoom: 2.5,
    styles: is_dark_mode? dark_mode : [],  // dark mode from 9am to 4pm just cuz, also manual refresh ofc
  });
  loadData()
}

function loadData() {
  fetch('https://sheetdb.io/api/v1/tkuqr1trfymqt')
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        data.forEach((row, index)=>{
          city(row.name, row.date_est, row.url, row.points.split('--'), parseFloat(row.latitude), parseFloat(row.longitude), row.color)
        })
    })
    .catch(error => {
        console.error(error);
    });
}

function city_content(name, date, link, points_array) {
  return template.replace('{NAME}', name).replace('{DATE}', date).replace(/{LINK}/g, link).replace('{POINTS}', '<li>'+points_array.join('</li><li>')+'</li>').replace('{DARK-MODE}', is_dark_mode? ' dark-mode' : '')
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
