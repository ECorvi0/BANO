Documentation pour l'installation
Sujet 322 : BANO - Client

Enzo Corvi

30 Avril 2023

Le code, lui, a été développé avec Visual Studio Code (version 1.77.3) et testé avec un
navigateur Firefox (version 111) et un serveur WAMP avec la version 7.4.9 de php.
Pour l’installer, il est possible de le télécharger sous forme d'un dossier compressé.

C'est la méthode qui est proposée dans ce guide d'installation.

![Image téléchargement](Projet_BANO/Images/Download.PNG)

Une fois téléchargé, il faut ensuite décompresser le fichier téléchargé sous forme d'archive.

L'installation se fait en décompressant l'archive dans un endroit facile d’accès de votre ordinateur. 
Vous pouvez vérifier qu’il contient bien l’ensemble des fichiers suivants :
    La partie client constituée de :
    index.html
    main.js
    styles.css
    La partie serveur constituée de :
    bano-67-complete.geojson
    La partie testsUnitaires constituée de :
    testBoutons
    testStyles

Pour le lancer, il vous faut un navigateur et un serveur php.
Par exemple, avec un serveur WAMP que vous pouvez télécharger ici : https://www.wampserver.com/
Pour utiliser le serveur WAMP, il faut :
Lancer WAMP et attendre que les serveurs aient démarré
Ouvrir Firefox et tapez "localhost" en haut, dans la barre de
recheche : ce faisant, vous vous connectez au serveur WAMP que vous venez de
lancer. 

Il y aura ensuite un menu qui répertorie les dossiers contenus dans votre instance de WAMP.
Vous devrez sélectionner le dossier "Projet_BANO", puis lancer le fichier index.html contenu dans le sous-dossier "Client" du dossier "Projet_BANO".
Vous pourrez ensuite vous référer à la documentation utilisateur pour voir comment utiliser l’application.
    
