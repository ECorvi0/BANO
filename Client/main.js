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

const totalGrid = '/Projet_BANO/Serveur/bano-67-complete.geojson'

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

function binaryBufferedStyle(feature) {
    return {
        fillColor: getBinaryColor(feature.properties.NUMPOINTS_BUFFERED),
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
        fillColor: getShadedColor(feature.properties.NUMPOINTS / feature.properties.ind_c),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function shadedBufferedStyle(feature) {
    return {
        // Facteur correctif dans le cadre des tests unitaires, qui n'emploient que des carreaux de 200 mètres
        fillColor: getShadedColor(feature.properties.NUMPOINTS_BUFFERED / feature.properties.ind_c * 4 / 9),
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
        if (document.getElementById('noBuffer').checked) {
            console.log("Binaire sans buffer")
            return binaryStyle(feature)
        }
        else if (document.getElementById('buffer').checked) {
            console.log("Binaire avec buffer")
            return binaryBufferedStyle(feature)
        }
    }
    else if (document.getElementById('gradient').checked) {
        if (document.getElementById('noBuffer').checked) {
            console.log("Graduel sans buffer")
            return shadedStyle(feature)
        }
        else if (document.getElementById('buffer').checked) {
            console.log("Graduel avec buffer")
            return shadedBufferedStyle(feature)
        }
    }
}

// Initialisation de la grille
var geoJsonGrid = L.geoJSON(null, { style: mapStyle }).addTo(mymap)


//permet de vérifier visuellement l'implémentation des données carroyées
function getGrid() {
    // Récupération de la grille sans buffer
    fetch(totalGrid)
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
            geoJsonGrid.addData(data);
        });
}

function createGrid() {
    if (document.getElementById('binary').checked) {
        if (document.getElementById('noBuffer').checked) {
            getGrid()
        }
        else if (document.getElementById('buffer').checked) {
            getGrid()
        }
    }
    else if (document.getElementById('gradient').checked) {
        if (document.getElementById('noBuffer').checked) {
            getGrid()
        }
        else if (document.getElementById('buffer').checked) {
            getGrid()
        }
    }
}

// Appelle la fonction getGrid sur un click, zoom ou déplacement
mymap.on('moveend', createGrid);

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