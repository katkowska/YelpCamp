console.log('showPageMap.js executed');

mapboxgl.accessToken = 'pk.eyJ1Ijoia2F0Z2FsaWUiLCJhIjoiY2xyam0xOW84MDRnMzJxcWVjaWN6dTJ1YSJ9.5cnuj9xI5qYIwL2Q3V34dQ';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: campground.geometry.coordinates,
    zoom: 10
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${campground.title}</h3><p>${campground.location}</p>`
            )
    )
    .addTo(map);