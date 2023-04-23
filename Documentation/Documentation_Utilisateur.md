Pour utiliser l’application, la première chose à faire est de l’installer et de la lancer.
Vous pouvez pour cela vous référer à la documentation d’installation.

Votre navigateur vous affiche alors un fond de carte centré sur le Bas-Rhin, où la grille utilisée apparaît.

En dessous de ce fond de carte se trouvent deux couples de boutons radio.

Le premier couple sert à définir son style, qui peut soit être binaire (rouge en l'absence d'adresses dans un carreau et vert sinon) ou graduel (noir pour une absence d'adresses, vert pour un ratio adresses/populations égal à 1, et un pourcentage de vert égal au ratio dans le cas général).

Tandis que le second couple sert à déterminer si la grille à afficher devra ou non considérer un buffer de 50 mètres autour de chaque carreau pour le traitement des données d'adresse et de population.

Lorsque vous interagirez avec la carte, la grille apparaîtra selon les conditions définies via les boutons radio.

À chaque nouvelle interaction avec la carte, une nouvelle grille remplacera la grille existante, toujours selon les conditions définies via les boutons radio, que vous pouvez modifier à tout moment.

J'ai utilisé une grille d'un département entier en carreaux de 200 mètres. En raison de sa taille importante (environ 20 000 carreaux), la grille met quelques secondes à s'afficher.

Ce sont des conditions plus dures que celles décrites par EF321, qui concerne la partie serveur, mais qui permettent d'avoir une première approche en ce qui concerne la performance.

