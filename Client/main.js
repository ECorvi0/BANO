// creation de la carte
var mymap = L.map("mapid").setView([48.5, 7.5], 12);
const tileGeoportailWMTS = 'https://wxs.ign.fr/essentiels/geoportail/wmts?service=WMTS&request=GetTile&version=1.0.0&tilematrixset=PM&tilematrix={z}&tilecol={x}&tilerow={y}&layer=ORTHOIMAGERY.ORTHOPHOTOS&format=image/jpeg&style=normal'
window.onload = function () {
    L.tileLayer(
        tileGeoportailWMTS,
        {
            minZoom: 8,
            maxZoom: 18,
            tileSize: 256,
            attribution: "IGN-F/Géoportail"
        }).addTo(mymap);
}

// Accès aux données carroyées

const grid = "/Projet_BANO/Serveur/Compte_adresses_67.geojson";
const bufferedGrid = "/Projet_BANO/Serveur/buffered_Compte_adresses_67.geojson";

//fonction de coloration des données carroyées pour faciliter la visualisation

function getBinaryColor(n) {
    return n >= 1 ? "#00FF00" :
        "#FF0000";
}

var r = 0;
var g = 255;
var b = 0;

function getShadedColor(n) {
    return "rgba(" + r * n + "," + g * n + "," + b * n + ",1)";
}

// Coloration binaire

function binaryStyle(feature) {
    return {
        fillColor: getBinaryColor(feature.properties.NUMPOINTS),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

// Coloration graduelle

function shadedStyle(feature) {
    return {
        fillColor: getShadedColor(feature.properties.NUMPOINTS / feature.properties.ind_c * (1 - document.getElementById('buffer').checked / 2)),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

/*function toLoadGrid(inputGrid) {
    var outputGrid = L.geoJSON();

    fetch(inputGrid)
        .then(response => response.json())
        .then(data => {
            data.features.forEach(feature => {
                const bounds = L.latLngBounds(feature.geometry.coordinates);
                const mapBounds = L.latLngBounds(L.latLng([mapid.offsetTop, mapid.offsetLeft]), L.latLng([mapid.offsetTop + mapid.offsetHeight, mapid.offsetLeft + mapid.offsetWidth]));
                if (bounds.intersects(mapBounds)) {
                    emptyGeojson.addData(feature);
                }
            });

            outputGrid.addTo(map);
        });

    return outputGrid
}*/

var mapGrid = L.layerGroup()

//permet de vérifier visuellement l'implémentation des données carroyées
async function getGrid() {
    // Initialisation de la grille sans buffer dans la fonction
    if (document.getElementById('noBuffer').checked) {
        const response = await fetch(grid);
        const data = await response.json();
        var geoJsonGrid = L.geoJson(data);
    }
    //Vérifie si le bouton buffer est coché
    else if (document.getElementById('buffer').checked) {
        // Récupération de la grille avec buffer
        const bufferedResponse = await fetch(bufferedGrid);
        const bufferedData = await bufferedResponse.json();
        geoJsonGrid = L.geoJson(bufferedData);
        //création d'un buffer négatif pour conserver une lisibilité de l'information cartographique
        var geoJsonGridBuffered = turf.buffer(geoJsonGrid.toGeoJSON(), -0.05, { units: 'kilometers' });
        var leafletGridBuffered = L.geoJSON(geoJsonGridBuffered);
        geoJsonGrid = leafletGridBuffered;
    }
    if (document.getElementById('gradient').checked) {
        L.geoJSON(geoJsonGrid.toGeoJSON(), { style: shadedStyle }).addTo(mapGrid);
    }
    else if (document.getElementById('binary').checked) {
        L.geoJSON(geoJsonGrid.toGeoJSON(), { style: binaryStyle }).addTo(mapGrid);
    }
    mapGrid.addTo(mymap)
}

function clearAllLayers() {
    for (var i = 0; i < mapGrid.length; i++) {
        mymap.removeLayer(mapGrid[i]);
    }
    //this line empties the array
    mapGrid.length = 0;
}

mymap.on('click', function () {
    clearAllLayers()
    //mymap.removeLayer(mapGrid);
    //var mapGrid = L.layerGroup()
    getGrid()
});

var radiosOui = document.getElementsByName('ouinon');
var radiosMode = document.getElementsByName('mode');
for (i = 0; i < radiosOui.length; i++) {
    radiosOui[i].onclick = function (e) {
        // un clic sur un bouton coché tout en maintenant la touche ctrl le décoche
        if (e.ctrlKey || e.metaKey) {
            this.checked = false;
        }
    }
}
for (i = 0; i < radiosMode.length; i++) {
    radiosMode[i].onclick = function (e) {
        // un clic sur un bouton coché tout en maintenant la touche ctrl le décoche
        if (e.ctrlKey || e.metaKey) {
            this.checked = false;
        }
    }
}

//toLoadGrid(grid);