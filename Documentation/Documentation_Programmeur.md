Ce document présente les différents fichiers constituant le rendu de ce projet.

Partie 1 : La partie client

1.1 Page HTML

La page HTML contient lesz espaces qui permettent d'afficher les différentes informations que le client doit récupérer.

1.2 CSS

Le CSS est pour le moment inexistant, mais un fichier styles vide est tout de même présent dans le projet.

1.3 JavaScript

Je fais ici le choix de ne pas montrer par l'emprise l'existence de buffer pour des raisons de lisibilité de l'information cartographique.

Partie 2 : La partie serveur, qui permet les tests unitaires

Les tests unitaires consistent en des pages html qui simulent la page que devrait renvoyer le serveur PHP.

Mon serveur est composé de fichiers geojson que j'ai retraités avec QGIS 3.12.

Les fichiers utilisés pour le traitement :
Base d'adresses
Carreaux INSEE

Le traitement :

{Insérer images QGIS}

Ce traitement a permis de compter les adresses contenues dans les carreaux avec buffer.