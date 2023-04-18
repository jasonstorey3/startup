/*!
 * Start Bootstrap - Simple Sidebar v6.0.5 (https://startbootstrap.com/template/simple-sidebar)
 * Copyright 2013-2022 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/LICENSE)
 */
// 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {
    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    const mapElement = document.body.querySelector('#map');
    if (sidebarToggle) {
        if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
            document.body.classList.toggle('sb-sidenav-toggled');
        }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
            if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
                mapElement.style.width = "1235px";
                console.log(mapElement.style.width);
            } else {
                mapElement.style.width = "1000px";
                console.log(mapElement.style.width);
            }
        });

    }
})

let map;
let userMarker;

async function initMap() {
    const defaultLatLng = [40.2518, 111.6493]; // Default coordinates (change if needed)

    // Create a new map centered at the default coordinates
    map = L.map("map").setView(defaultLatLng, 13);

    // Add OpenStreetMap tiles layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
    }).addTo(map)

    let status = 'Available';
    let userLocation

    // Try to get the user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLocation = [
                    position.coords.latitude,
                    position.coords.longitude,
                ];

                // Center the map at the user's location
                map.setView(userLocation);

                // Create a marker for the user's location
                userMarker = L.marker(userLocation, {
                    icon: createUserIcon()
                }).addTo(map);
                userMarker.bindPopup(`${status}`).openPopup();
            },
            () => handleLocationError(true)
        );
        const response = await fetch('/api/location', {
            method: 'post',
            body: JSON.stringify({
                from: localStorage.getItem('userName'),
                location: userLocation
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false);
    }
}
async function loadLocations() {
    let locations = [];
    try {
        // Get the locations from the service
        const response = await fetch('/api/locations');
        locations = await response.json();

        // Save the locations in case we go offline in the future
        localStorage.setItem('locations', JSON.stringify(locations));
    } catch {
        // If there was an error then just use the last saved locations
        const locationsText = localStorage.getItem('locations');
        if (locationsText) {
            locations = JSON.parse(locationsText);
        }
    }

    displayLocations(locations);
}

async function displayLocations(locations) {
    if (locations.length) {
        // Update the map with the locations
        for (const [i, location] of locations.entries()) {
            const status = location.status;
            // Get the status of each user
            const response = await fetch('/api/status');
            locations = await response.json();
            // Create a marker for the user's location
            userMarker = L.marker(location.location, {
                icon: createUserIcon()
            }).addTo(map);
            userMarker.bindPopup(`${status}`).openPopup();
        }
    }
}


loadLocations();

function handleLocationError(browserHasGeolocation) {
    alert(browserHasGeolocation ?
        "Error: The Geolocation service failed." :
        "Error: Your browser doesn't support geolocation.");
}

// Initialize the map
initMap();

function createUserIcon() {
    return L.icon({
        iconUrl: '//upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Simpleicons_Places_map-marker-with-a-person-shape.svg/485px-Simpleicons_Places_map-marker-with-a-person-shape.svg.png',
        iconSize: [30, 50], // Size of the icon, adjust based on your image
        iconAnchor: [12, 41], // Point of the icon to be positioned at the marker's location
        popupAnchor: [0, -41] // Point of the popup relative to the icon's anchor
    });
}

const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
socket.onopen = (event) => {};
socket.onclose = (event) => {};
socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    const status = message.status;
    userMarker.setPopupContent(`${status}`).openPopup();
}

async function changeStatus(status) {
    const event = {
        from: localStorage.getItem('userName'),
        status: status
    };
    socket.send(JSON.stringify(event));
    const response = await fetch('/api/status', {
        method: 'post',
        body: JSON.stringify({
            from: localStorage.getItem('userName'),
            status: status
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
}