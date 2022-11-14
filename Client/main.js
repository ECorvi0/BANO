// creation de la carte
var mymap = L.map("mapid").setView([48.5, 7.5], 12);
const tileGeoportailWMTS = 'https://wxs.ign.fr/essentiels/geoportail/wmts?service=WMTS&request=GetTile&version=1.0.0&tilematrixset=PM&tilematrix={z}&tilecol={x}&tilerow={y}&layer=ORTHOIMAGERY.ORTHOPHOTOS&format=image/jpeg&style=normal'
window.onload = function () {
    L.tileLayer(
        tileGeoportailWMTS,
        {
            minZoom: 0,
            maxZoom: 18,
            tileSize: 256,
            attribution: "IGN-F/Géoportail"
        }).addTo(mymap);
}

const grid = "/Projet BANO/Serveur/Compte_adresses_67.geojson";
const bufferedGrid = "/Projet BANO/Serveur/buffered_Compte_adresses_67.geojson";

//fonction de coloration des données carroyées pour faciliter la visualisation

function getBinaryColor(n) {
    return n >= 1 ? "#00FF00" :
        "#FF0000";
}

var r = 0;
var g = 255;
var b = 0;

function getShadedColor(n) {
    return "rgba(" + r * n + "," + g * n ** 0.5 + "," + b * n + ",1)";
}

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

async function getGrid() {
    //permet de vérifier visuellement l'implémentation des données carroyées
    const response = await fetch(grid);
    const data = await response.json();
    var geoJsonGrid = L.geoJson(data);
    //Vérifie si le bouton buffer est coché
    if (document.getElementById('buffer').checked) {
        const bufferedResponse = await fetch(bufferedGrid);
        const bufferedData = await bufferedResponse.json();
        geoJsonGrid = L.geoJson(bufferedData);
        //création d'un buffer négatif pour conserver une lisibilité de l'information cartographique
        var geoJsonGridBuffered = turf.buffer(geoJsonGrid.toGeoJSON(), -0.05, { units: 'kilometers' });
        var leafletGridBuffered = L.geoJSON(geoJsonGridBuffered);
        geoJsonGrid = leafletGridBuffered;
    }
    if (document.getElementById('gradient').checked) {
        L.geoJSON(geoJsonGrid.toGeoJSON(), { style: shadedStyle }).addTo(mymap);
    }
    else if (document.getElementById('binary').checked) {
        L.geoJSON(geoJsonGrid.toGeoJSON(), { style: binaryStyle }).addTo(mymap);
    }
}

var radiosOui = document.getElementsByName('ouinon');
var radiosEval = document.getElementsByName('eval');
for (i = 0; i < radiosOui.length; i++) {
    radiosOui[i].onclick = function (e) {
        // un clic sur un bouton coché tout en maintenant la touche ctrl le décoche
        if (e.ctrlKey || e.metaKey) {
            this.checked = false;
        }
    }
}
for (i = 0; i < radiosEval.length; i++) {
    radiosEval[i].onload = function (e) {
        if (e.value == 1) {
            this.checked = true;
        }
    }
    radiosEval[i].onclick = function (e) {
        // un clic sur un bouton coché tout en maintenant la touche ctrl le décoche
        if (e.ctrlKey || e.metaKey) {
            this.checked = false;
        }
    }
}

getGrid();
