Ce document présente les différents fichiers constituant le rendu de ce projet.

Partie 1 : La partie client

1.1 Page HTML

La page HTML contient les espaces qui permettent d'afficher les différentes informations que le client doit récupérer.

1.2 CSS

Le CSS règle la taille de la carte. Des ajouts seront faits avec l'avancement du projet.

1.3 JavaScript

Le Javascript sert à communiquer avec le serveur par AJAX, avec des données en format GeoJson, pour l'envoi et le retour de la requête.

Fonction getGrid()

Ajout d'une fonction createGrid() pour éviter l'apparition de grilles sans styles ce qui a pu être

Partie 2 : La partie serveur, qui contient les données des tests unitaires, ainsi que des données proches de celles que renverrraient réellement le serveur

Mon serveur est composé de fichiers geojson que j'ai retraités avec QGIS 3.12.

Les fichiers utilisés pour le traitement :
Base d'adresses
Carreaux INSEE

Le traitement :

Je disposais au départ de carreaux INSEE pour chaque département mais les informations fournies étaient incomplètes.
À partir d'un fichier contenant des adresses j'ai augmenté les données carroyées en y ajoutant l'information du nombre d'adresses contenues dans chaque carreau (fonction QGIS count points) {Insérer images QGIS}
J'ai ensuite utilisé la fonction buffer pour créer la version avec buffer et lui ai apliqué le même traitement.
J'ai fait ce choix en raison de l'absence de données carroyées avec buffer, et pour m"assurer d'avoir des nombres justes car il existe des cas où il n'y a aucune adresse dans un carreau de 200 mètres de côté mais où des points existent 50 mètres autour.

{Insérer images QGIS}

J'ai ensuite effectué une jointure spatiale des deux grilles pour récupérer le nombre de points dans la configuration avec buffer et avoir l'information avec buffer et l'information sans buffer dans une même grille.

J'ai utilisé une grille d'un département entier (Bas-Rhin) en carreaux de 200 mètres. En raison de sa taille importante (environ 20 000 carreaux), la grille met quelques secondes à s'afficher.

Ce sont des conditions plus dures que celles décrites par EF321, qui concerne la partie serveur, mais qui permettent d'avoir une première approche en ce qui concerne la performance.

Partie 3 : Les tests unitaires

Les tests unitaires consistent en des pages html qui vérifient que les éléments de la page fonctionnent bien et qu'ils renvoient les bonnes informations.

Partie 3.1 : testGrille.html

Cette page vérifie quelles combinaisons de boutons sont possibles, et parmi les combinaisons possibles, lesquelles appellent le serveur, simulé ici par un fichier GeoJson.

PArmi les 16 combinaisons théoriquement possibles, 7 sont empêchées par le fonctionnement des boutons radio, qui ne permettent qu'un bouton coché pour un "name" donné.

Les 9 combinaisons restantes se classent en deux séries de tests.

Une série de 5 tests, où moins de 2 boutons sont cochés.

Aucune grille n'est censée s'afficher dans cette série.

Une série de 4 tests, où 2 boutons sont cochés.

Les tests de cette série doivent afficher une grille.

La validité du style associé à chacune de ces combinaisons est l'objet de la sous-partie suivante.

Partie 3.2 : testStyles.html

Cette page vérifie quel style est appelé pour chaque combinaison parmi celles qui appellent une grille.

Celles qui ne sont pas censées appeler de grilles sont aussi testées, pour éviter un potentiel bug lié à une interaction imprévue entre la grille et les styles qui peuvent y être associés.

Partie 3.3 : testCarte.html

Cette page vérifie les différents mouvements qui amènent à un rechargement des données.

