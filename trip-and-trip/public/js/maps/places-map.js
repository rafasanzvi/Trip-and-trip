let map

function init() {
    renderMap()
    getPlacesFromDB()
}

function renderMap() {
    map = new google.maps.Map(
        document.querySelector('#myMap'),
        {
            zoom: 12,
            center: {
                lat: 40.42042928766834, lng: - 3.7091093386208702
            }
        }
    )
}

function getPlacesFromDB() {

    axios
        .get('/api/events')
        .then(response => printMarkers(response.data))
        .catch(err => console.log(err))

}

function printMarkers(events) {
    console.log(events)

    events.forEach(event => {
        let position = { lat: event.location.coordinates[0], lng: event.location.coordinates[1] }
        console.log(position)

        new google.maps.Marker({ position, map })

    })
    map.setCenter({ lat: events[0].location.coordinates[0], lng: events[0].location.coordinates[1] })
}