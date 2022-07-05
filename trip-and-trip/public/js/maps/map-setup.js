const startingPoint = {
    lat: 42,
    lng: 42
}

function renderMap() {

    new google.maps.Map(
        document.querySelector('#myMap'),
        {
            zoom: 12,
            center: startingPoint,

        }
    )
}