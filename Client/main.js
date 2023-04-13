// creation de la carte
var mymap = L.map('mapid').setView([48.5, 7.5], 14);
const tileGeoportailWMTS = 'https://wxs.ign.fr/essentiels/geoportail/wmts?service=WMTS&request=GetTile&version=1.0.0&tilematrixset=PM&tilematrix={z}&tilecol={x}&tilerow={y}&layer=ORTHOIMAGERY.ORTHOPHOTOS&format=image/jpeg&style=normal'

L.tileLayer(
    tileGeoportailWMTS,
    {
        minZoom: 8,
        maxZoom: 18,
        tileSize: 256,
        attribution: 'IGN-F/Géoportail'
    }).addTo(mymap);


// Accès aux données carroyées

const grid = '/Projet_BANO/Serveur/Compte_adresses_67.geojson';
const bufferedGrid = '/Projet_BANO/Serveur/buffered_Compte_adresses_67.geojson';

//fonction de coloration des données carroyées pour faciliter la visualisation

function getBinaryColor(n) {
    return n >= 1 ? '#00FF00' :
        '#FF0000';
}

var r = 0;
var g = 255;
var b = 0;

function getShadedColor(n) {
    return 'rgba(' + r * n + ',' + g * n + ',' + b * n + ',1)';
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

// Style de la grille, qui reprend les deux styles qui peuvent lui être appliqué selon ce que l'utilisateur choisit

function mapStyle(feature) {
    if (document.getElementById('binary').checked) {
        return binaryStyle(feature)
    }
    else if (document.getElementById('gradient').checked) {
        return shadedStyle(feature)
    }
}

// Initialisation de la grille
var geoJsonGrid = L.geoJSON(null, { style: mapStyle }).addTo(mymap)


//permet de vérifier visuellement l'implémentation des données carroyées
async function createGrid() {
    // Récupération de la grille sans buffer
    if (document.getElementById('noBuffer').checked) {
        fetch(grid)
            .then(response => response.json())
            .then(data => {
                // Vide la couche de données (elle peut être vide avant cette étape)
                geoJsonGrid.clearLayers();
                // Rajoute les nouvelles données à la couche
                data.features.forEach(feature => {
                    const bounds = L.latLngBounds(feature.geometry.coordinates);
                    const mapBounds = L.latLngBounds(L.latLng([mapid.offsetTop, mapid.offsetLeft]), L.latLng([mapid.offsetTop + mapid.offsetHeight, mapid.offsetLeft + mapid.offsetWidth]));
                    if (bounds.intersects(mapBounds)) {
                        geoJsonGrid.addData(feature);
                    }
                });
                // Rajoute les nouvelles données à la couche
                //geoJsonGrid.addData(data);
            });
    }
    //Vérifie si le bouton buffer est coché
    else if (document.getElementById('buffer').checked) {
        // Récupération de la grille avec buffer
        fetch(bufferedGrid)
            .then(bufferedResponse => bufferedResponse.json())
            .then(bufferedData => {
                // Vide la couche de données (elle peut être vide avant cette étape)
                geoJsonGrid.clearLayers();
                // Retrait visuel du buffer, qui ne modifie pas les données de la grille avec buffer
                var unbufferedData = turf.buffer(bufferedData, -0.05, { units: 'kilometers' });
                // Rajoute les nouvelles données à la couche
                geoJsonGrid.addData(unbufferedData);
            });
    }
}

// Vérifie que l'utilisateur a choisi son style avant d'afficher la grille

async function getGrid() {
    if (document.getElementById('binary').checked) {
        createGrid()
    }
    else if (document.getElementById('gradient').checked) {
        createGrid()
    }
}


// Appelle la fonction getGrid sur un click, zoom ou déplacement
mymap.on('moveend', getGrid);

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

