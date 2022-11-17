# Documentation

Il s'agit d'une documentation technique, qui explique les différentes parties de l'application.

L'application contient deux fonctions.

La première affiche le fond de carte. Pour cela, un flux de données Géoportail est utilisé.

Cela est possible grâce à l'adresse, qui peut être obtenue via la documentation disponible sur le Géoportail.

## Création des données serveur

Les données serveur proviennent d'un traitement sous QGIS.

### Intersection

![Image intersection](Images/Intersection.PNG)

J'ai utilisé l'intersection à deux reprises.

Un problème s'est posé au moment de créer les zones tampons.

La projection WGS84, qui est utilisée pour le fond de carte, ne pouvait admettre un tampon en mètres.

J'ai donc recouru au RGF93 pour créer la zone tampon avant de revenir au WGS84 par l'intersection.

### Count points in Polygon

### Buffer

![Tampon](Images/Buffer.PNG)

### Conversion en GeoJSON

La conversion en GeoJSON se fait via QGIS.

Il est en effet possible d'exporter sa couche au format GeoJSON, ainsi que d'autres formats.

![Export](Images/Export.PNG)

## Application client

### Fond de carte

### Boutons

#### Boutons radio

#### Boutons d'exécution

### Affichage des données carroyées

