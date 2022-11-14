/// Remember to put jquery from their website

// creation de la carte
var mymap = L.map("mapid", {
}).setView([48.5, 7.5], 12);
const attribution = 'Map data &copy; <a href="https://geoservices.ign.fr/">IGN</a> contributors, Imagery © <a href="https://www.geoportail.fr/">Géoportail</a>'
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
// creation et ajout de la couche WMS à la carte
/*L.geoportalLayer.WMS({
    layer: "OI.OrthoimageCoverage",
    attribution: attribution
}).addTo(mymap);*/

const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

//const tileGeoportail = 'https://wxs.ign.fr/essentiels/geoportail/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ORTHOIMAGERY.ORTHOPHOTOS' +
//'&TILEMATRIXSET=PM&TILEMATRIX=14&TILECOL=8180&TILEROW=5905&STYLE=normal&FORMAT=image/jpeg'
//const tileGeoportailWFS = 'https://wxs.ign.fr/parcellaire/geoportail/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=DescribeFeatureType&TYPENAME=CADASTRALPARCELS.PARCELLAIRE_EXPRESS:parcelle&outputFormat=application/json'
//const BANOurl = 'https://wxs.ign.fr/adresse/geoportail/v/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities'

//var jlayer = new L.LayerJSON({ url: "search.php?lat1={lat1}&lat2={lat2}&lon1={lon1}&lon2={lon2}" });

//jlayer.addLayer(mymap);

const book = '/Projet BANO/Serveur/bano-67.geojson';
const grid972 = "/Projet BANO/Serveur/Compte_adresses_972.geojson";
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

async function getBANO() {
    //permet de vérifier visuellement l'implémentation des adresses
    const response = await fetch(book);
    const data = await response.json();
    L.geoJSON(data).addTo(mymap);
    //getAdressesBANO(data.message);
    /*data.forEach(function (obj) {
        const long = obj.lon;
        const lat = obj.lat;
        console.log(data);
        L.marker([lat, long]).addTo(mymap);
    });*/
}

async function getGrid() {
    //permet de vérifier visuellement l'implémentation des données carroyées
    const response = await fetch(grid);
    const data = await response.json();
    var geoJsonGrid = L.geoJson(data);
    //non fonctionnel (problème avec la bibliothèque turf)
    if (document.getElementById('buffer').checked) {
        const bufferedResponse = await fetch(bufferedGrid);
        const bufferedData = await bufferedResponse.json();
        geoJsonGrid = L.geoJson(bufferedData);
        //création d'un buffer négatif pour conserver une lisibilité de l'information cartographique
        var geoJsonGridBuffered = turf.buffer(geoJsonGrid.toGeoJSON(), -0.05, { units: 'kilometers' });
        var leafletGridBuffered = L.geoJSON(geoJsonGridBuffered);
        geoJsonGrid = leafletGridBuffered;
        /*data.forEach(function (feature) {
            var bufferLoad = turf.buffer(feature, 0.05, { units: 'kilometers' });
            var bufferDisplay = L.geoJson(bufferLoad, { style: shadedStyle });
            L.geoJson(bufferDisplay).addTo(mymap);
        });*/
    }
    if (document.getElementById('gradient').checked) {
        L.geoJSON(geoJsonGrid.toGeoJSON(), { style: shadedStyle }).addTo(mymap);
    }
    else if (document.getElementById('binary').checked) {
        L.geoJSON(geoJsonGrid.toGeoJSON(), { style: binaryStyle }).addTo(mymap);
    }
    /*else {
        L.geoJSON(data, { style: binaryStyle }).addTo(mymap);
    }*/
}
/*async function count() {
    const response = await fetch(grid);
    const layer = await response.json();
    const input = await fetch(book);
    const data = await input.json();
    var geoJsonLayer = L.geoJson(layer);
    var c = [0];
    i = 0;
    //Prend chaque carreau et cherche les adresses contenues dans le carreau
    geoJsonLayer.eachLayer(function (feature) {
        data.forEach(function (obj) {
            if (turf.booleanWithin(feature.properties, obj)) {
                c[i] = c[i] + 1;
            }
        });
        //permet de toujours traiter le dernier élément de la liste
        c = c + [0];
        i += 1;
        //console.log(i);
        console.log(c[i]);
    });
    return (c);
};*/

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



async function test() {
    var nepalDistrict = L.geoJSON(grid, {
        onEachFeature: function (feature, layer) {
            area = (turf.area(feature) / 1000000).toFixed(2);
            center_lat = turf.center(feature).geometry.coordinates[1]
            center_long = turf.center(feature).geometry.coordinates[0]
            bbox = turf.bbox(feature).toString();
            layer.bindPopup(`<b>Area: </b> ${area} </br> <b>Center(x,y): </b> (${center_long, center_lat}) </br> <b>Bbox: </b> [${bbox}]`)
        }
    });
    console.log('working');
}

//test();
//getBANO();
getGrid();
//count();