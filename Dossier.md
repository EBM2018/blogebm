# Présentation

Ce travail baptisé "blogebm" constitue le travail final du module "Front End / Back End" pour Lenophie et MaxouLégal.  
Il s'agit d'un gestionnaire d'articles dont l'originalité est de gérer les paragraphes de ses articles individuellement.
L'objectif principal est de permettre l'édition d'articles.  
Pour ce faire, l'utilisateur doit pouvoir accéder à une page d'édition où il peut ajouter des paragraphes, les fournir et les échanger de manière simple.
L'accent est donc mis sur les possibilités offertes à l'utilisateur et l'expérience qu'il en fait.

# Horizon technique

Une bonne partie du traitement Back-End ayant été fournie préalablement, il n'était pas nécessaire de réproduire une telle architecture.
Cependant, nous trouvions plus stimulant de refaire ce travail d'une façon différente et plus "professionnelle".
Nous avons donc eu recours au framework PHP *Laravel* pour réaliser ce travail.  
Pour la partie Front-End, *jQuery* et *jQueryUI* étaient conseillés car couverts par le cours mais nous avons préféré opter pour l'utilisation
des récentes fonctionnalités HTML5/js pour le scripting et un léger framework CSS nommé *Bulma* pour la présentation.

## Laravel

*Laravel* est un framework PHP assez récent qui s'inspire beaucoup d'autres frameworks du milieu, notamment *Symphony* avec lequel il partage des modules.  
Une liste des fonctionnalités phares de *Laravel* :
* Une architecture MVC
* Un moteur de template : *Blade*
* Un ORM : *Eloquent*
* Un routeur attaché aux modèles
* Un outil de génération de code : *Artisan*
* Un système de migration de bases de données
* Du test unitaire avec *PHPUnit*
* Du test d'intégration sur navigateur avec *Dusk*
* Un asset bundler pour le service au client : *Webpack*

## HTML5/Js avancé

Quelques-unes de fonctionnalités utilisées pour remplacer l'utilisateur de *jQuery* :
* [Les data-attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes)
* [L'API HTML de Drag and Drop](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
* Du requêtage Ajax manuel
* [La serialization de formulaires](https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects)
* [L'interface Event pour la gestion d'évènement](https://developer.mozilla.org/en-US/docs/Web/API/Event)

## Bulma

*Bulma* est un framework purement *CSS*.
Quelques fonctionnalités majeures de *Bulma* :
* Système de grille basé sur *Flexbox*
* Construction avancée de structure générale
* Construction avancée de formulaire
* Bibliothèque de composants variée (boutons, cartes, cadres...)
* Responsiveness

# Livrable

## Installation

* Cloner le repo
* Installer ```Composer``` et ```npm``` si ce n'est déjà fait
* Se rendre à la racine du repo cloné
* Exécuter ```composer install``` pour installer les dépendances ```PHP```
* Exécuter ```npm install``` pour installer les dépendances ```js```
* Mettre en place une base de données ```MariaDB``` hébergée localement
    * Choisir le nom que l'on souhaite pour cette BDD et [lui créer un utilisateur avec les permissions nécessaires](http://www.daniloaz.com/en/how-to-create-a-user-in-mysql-mariadb-and-grant-permissions-on-a-specific-database/)
* Créer un fichier ```.env``` à la racine du projet
    * Utiliser le fichier ```.env.example``` comme template
    * Le remplir avec ses propres paramètres :
        * ```DB_DATABASE``` le nom de la BDD
        * ```DB_USERNAME``` l'utilisateur de la BDD
        * ```DB_PASSWORD``` le mot de passe de l'utilisateur
* Exécuter ```php artisan migrate --seed``` pour migrer la base de données
* Exécuter ```php artisan serve``` pour servir l'application
* Exécuter ```npm run watch``` pour bundle les ressources ```js```
* Se rendre à ```localhost:8000``` avec un navigateur web

## Découverte

Le site contient déjà quelques articles produit par l'utilisateur "EBM" :
* Email : EBM@EBM.ebm
* Password : hamzaoutai

Vous pouvez vous connecter en tant que cet utilisateur ou créer votre propre compte pour découvrir le site et expérimenter avec.
        
## Fonctionnalités

### Utilisation générale

* N'importe quel visiteur peut consulter les articles de son choix
* En s'inscrivant, un utilisateur peut rédiger des articles et les publier.
* Quand il est connecté, l'utilisateur peut modifier ses propres articles mais pas ceux des autres.
    * De même, il peut supprimer ses propres articles.

### Détail

#### Authentification

* Le système d'authentification est celui proposé par *Laravel*. Avec une seule commande, le framework génère différentes routes avec les vues et controlleurs associés :
    * Inscription
    * Connexion
    * Déconnexion
    * *Réinitialisation du mot de passe (retiré pour ce projet)*
* Il s'agit d'une simple implémentation d'un système de session et du stockage d'informations dans une base de données mais qui s'utilise facilement pour gérer les permissions comme nous le verrons ensuite.
* Pour se connecter ou s'inscrire, il suffit d'appuyer sur le bouton approprié sur la page d'accueil et de remplir un formulaire.
* Une fois connecté, le nom de l'utilisateur est affiché dans le header avec un bouton Déconnexion.

#### Navigation

* L'utilisateur est accueilli sur la page principale par l'ensemble des articles produits triés par date de dernière modification.
* Pour se rendre sur un article, il suffit de cliquer sur son titre qui apparait en surbrillance.
* L'utilisateur peut retourner à tout moment sur la page d'accueil en cliquant sur le nom du site en haut à gauche.
* Quand l'utilisateur se trouve sur l'un de ses articles, un bouton "Mode édition" est présent, lui permettant de basculer dans le-dit mode.
* De même, en mode édition, l'utilisateur rebascule en mode lecture avec un simple clic sur le bouton approprié.
* Quand l'utilisateur (connecté) se trouve sur la page d'accueil, il peut remarquer un bouton "Créer un article" lui guidant vers la page appropriée.

#### Création d'article

* L'utilisateur renseigne le nom de son article et un résumé facultatif qui apparait sur la page d'accueil
* Il peut ensuite cliquer sur "Ajouter un paragraphe" pour faire apparaitre un nouveau textarea qui prend le focus
    * Dans ce cas, le textarea sera pré-rempli avec "Nouveau paragraphe"
    * Il peut préalablement remplir le champ situé à côté de ce bouton, le textarea sera alors rempli avec ce texte-là
* Il n'est pas possible de déplacer les paragraphes en mode édition (simple souci de temps, même si le traitement fait pour l'édition d'article s'y adapte très facilement)
* Quand un textarea est survolé par la souris, une croix apparait en haut à droite de ce dernier, permettant de le supprimer

#### Édition d'article

* En mode "Édition", l'utilisateur peut cliquer sur les paragraphes pour les remplacer par des textarea et pouvoir ainsi modifier leur contenu.
* Quand il appuie sur "Entrer", le paragraphe modifié est envoyé au serveur pour mise à jour. A la réception du message de succès serveur, le textarea redevient un simple paragraphe.
* Il est également possible de changer l'ordre des paragraphes par simple glisser-déposer
    * Cela n'est possible que si aucun paragraphe n'est en cours d'édition
    * A chaque déplacement, une requête est envoyée au serveur pour mettre à jour l'ordre des paragraphes dans la base de données
* Quand un textarea est survolé par la souris, une croix apparait en haut à droite de ce dernier, permettant de le supprimer
    * Une requête est alors envoyée au serveur pour supprimer ce paragraphe de la base de données

