
function init(){

    let map = new ymaps.Map("map", {
        center: [60.025287, 30.636935],
        zoom: 15,
        controls:["zoomControl"],
        yandexMapDisablePoiInteractivity: true,
    },
    {
        autoFitToViewport: "always",
        maxZoom: 18,
        minZoom: 3
    });

    map.behaviors.disable("scrollZoom");
    map.behaviors.disable("drag");
    map.container.fitToViewport();

    let mark = new ymaps.Placemark([60.025287, 30.636935], {
        balloonContent: ''
    }, {
        iconColor: '#000000bb'
    });

    map.geoObjects.add(mark);
}

try {
    ymaps.ready(init);
} catch {
    void(0);
}

