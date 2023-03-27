Ce document présente les différents fichiers constituant le rendu de ce projet.

Partie 1 : La partie client

1.1 Page HTML

La page HTML contient les espaces qui permettent d'afficher les différentes informations que le client doit récupérer.

1.2 CSS

Le CSS règle la taille de la carte. Des ajouts seront faits avec l'avancement du projet.

1.3 JavaScript

Je fais ici le choix de ne pas montrer par l'emprise l'existence de buffer pour des raisons de lisibilité de l'information cartographique.


Partie 2 : La partie serveur, qui permet les tests unitaires

Les tests unitaires consistent en des pages html qui simulent la page que devrait renvoyer le serveur PHP.

Mon serveur est composé de fichiers geojson que j'ai retraités avec QGIS 3.12.

Les fichiers utilisés pour le traitement :
Base d'adresses
Carreaux INSEE

Le traitement :

Je disposais au départ de carreaux INSEE mais les informations fournies étaient incomplètes.
À partir d'un fichier contenant des adresses j'ai augmenté les données carroyées en y ajoutant l'information du nombre d'adresses contenues dans chaque carreau (fonction QGIS count points) {Insérer images QGIS}
J'ai ensuite utilisé la fonction buffer pour créer la version avec buffer et lui ai apliqué le même traitement.
J'ai fait ce choix en raison de l'absence de données carroyées avec buffer, et pour m"assurer d'avoir des nombres justes car il existe des cas où il n'y a aucune adresse dans un carreau de 200 mètres de côté mais où des points existent 50 mètres autour.

{Insérer images QGIS}

