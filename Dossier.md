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
    * Dans ce cas, une requête est envoyée au serveur pour supprimer ce paragraphe de la base de données
* L'interaction souhaitée avec la touche "Echap" n'a pas été implémentée car nous n'avons pas réellement compris ce qui était voulu, retourner sur la page de lecture sans valider les paragraphes en cours de modification donne le résultat souhaité

#### Suppression d'article

* En mode "Édition", l'utilisateur peut supprimer l'article d'un simple clic.
* L'article et les paragraphes associés sont alors supprimés de la base de données.
* Quand la suppression est un succès, l'utilisateur est redirigé vers la page d'accueil.

## Implémentation

### Back-End

Je vais ici expliquer le fonctionnement Back-End afin que vous puissiez d'abord comprendre le fonctionnement de ce dernier et aussi pour que vous puissiez retrouver le travail réalisé parmi l'arborescence fourni de ce dernier.

#### Présentation de la racine

Passons en revue les dossiers à la racine
* App : Contient la logique (contrôleurs, middlewares, service providers, validation des requêtes...)
* Bootstrap : Contient les scripts de bootstrap (mise en cache de l'app..., non utilisé dans ce projet)
* Config : Contient la configuration de l'application (presque pas utilisé dans ce projet à part la configuration de la langue sur laquelle nous reviendrons)
* Database : Contient les fonctionnalités relatives aux bases de données
    * Les factories pour peupler des tables en testant (non utilisé ici)
    * Les migrations pour créer et modifier la structure des tables ainsi que leurs relations (Ce qui se cachait derrière le ```php artisan migrate```)
    * Les seeds pour peupler des tables (en dev ou en prod) : C'est là que l'utilisateur EBM et les articles par défaut ont été décrit (Ce qui cachait derrière le ```--seed``` de la commande précédente)
* Public : Contient la phase visible de l'application au reste du monde (les scripts bundlés, les feuilles de style...)
* Resources : Contient les sources pour ce qui est déployé dans le dossier public (les scripts, les vues, les fichiers de traductions, les pré-processeurs css...)
* Routes : Contient les routes de l'appli, c'est le point d'entrée de toute requête, dans notre cas, uniquement via le web
* Storage : Contient du cache et les logs
* Tests : Contient les tests de l'application (non utilisé ici)
* Node_modules et vendor sont les dossiers contenant respectivement les dépendances js et PHP
Et les fichiers intéressants à la racine :
* .env : Contient les données d'environnement du projet (connexion à la BDD, aux serveurs de mail...)
* composer.json : Liste les dépendances PHP
* package.json : Liste les dépendances js
* webpack.mix.js : Fichier de configuration Webpack simplifié pour Laravel (*Laravel Mix*)

#### Chemin d'une requête

On va donc voir comment cette architecture est traversée quand on reçoit une requête.  
Imaginons que le serveur reçoit une demande de suppression d'article (le numéro 2 par exemple), il s'agit donc d'un DELETE sur l'adresse /articles/2.  

##### Routing

On arrive d'abord dans ```routes/web.php```, *Laravel* compare la requête avec les routes du haut vers la bas, jusqu'à trouver une qui correspond.  
Dans notre cas, on s'arrête ici ```Route::delete('articles/{id}', 'ArticleController@destroy')->name('article.destroy');```  
Cette ligne indique que la route pour cette requête et de faire appel à la méthode ```destroy``` du contrôlleur ```ArticleController```.  

##### Validation

On arrive alors dans ```app/Http/Controllers/ArticleController.php```.  
On passe d'abord par la méthode ```__construct``` qui vérifie que l'utilisateur est bien authentifié (cet vérification est effectuée pour toutes les méthodes autres que ```show```).  
Cette vérification est faite par un "middleware", c'est un script qui fait interface pour les contrôleurs, aucun middleware n'a ici été utilisé à part ```Auth``` qui gère les sessions.  
Si l'utilisateur n'est pas connecté, un message d'erreur lui est renvoyé, sinon on continue.  
La méthode ```destroy``` fait appel en paramètre à une requête de type ```DestroyArticleRequest```. En fait, avec le typage dynamique PHP, Laravel comprend que la requête qui est reçue est une requête de ce type et va d'abord lui faire passer les validations de ce type de requête avant d'attaquer le coeur de la méthode ```destroy```
On se retrouve donc dans ```app/Http/Requests/DestroyArticleRequest.php```.  
Dans un premier temps, ```authorize``` vérifie que l'utilisateur est bien autorisé à faire cette requête, qu'il est bien l'auteur de l'article qu'il souhaite supprimer.  
Ensuite ```all``` ajoute l'id présent en paramètre de route dans le corps de la requête pour lui faire passer les règles de validations présentes dans ```rules```.  
*Laravel* fournit des règles-type qui suffisent dans la plupart des cas, ici on a ```'id' => 'required|integer|exists:articles,id'```, on vérifie que l'id est présent, qu'il est entier et qu'il existe bien un article qui l'a pour id dans la base de données.  

##### Contrôleur + Modèle

Une fois toutes ses règles vérifiées et validées, le corps de ```destroy``` est exécuté : On y supprime l'article de la base de données via une manipulation du modèle Article.  
Le modèle d'article se trouve sous ```app/Article.php```, il y est indiqué les champs qui peuvent être assignés dans les contrôleurs, des traitements précis et les relations entretenues avec les autres modèles.  
Il n'y est pas précisé le nom de la table correspondante car *Laravel* reconnait qu'une table s'appelle "Article" au pluriel et lie implicitemen les deux.
Suite au traitement dans le contrôlleur, une réponse standard 200 est envoyé au client.

##### Cas d'une vue

Dans le cas où on souhaite envoyer du HTML, par exemple la méthode ```show``` du controleur Article, on indique à quelle vue on fait appel et quelles données on "compacte" pour les fournir à cette vue.  
On se rend alors dans ```resources/views/article/show.blade.php```. Il s'agit d'un fichier de template Blade à partir duquel sera produit le fichier HTML finale.  
Ce template étend le template générale "Template" en en complétant certaines sections, les traitements PHP sont balisés par ```{{ }}``` ou abrégés des ```@quelquechose```.  
On remarque qu'on y manipule directement la variable ```article``` que nous avons compacté avec la vue dans le contrôler.  
Une fois tout le contenu agrégé et l'arbre de templates remonté, le tout est servi au client.  

###### Gestion du texte statique

Vous remarquerez la présence de ce genres d'appels de fonctions PHP dans les templates ```__('Delete')```, il s'agit en fait d'un appel au gestionnaire de traduction.
Au lieu de mettre en clair du texte dans les vues, on les renseigne dans des listes. Ainsi on peut avoir les listes dans différentes langues et il suffit de changer la configuration de l'application, côté serveur ou plutôt en général client, pour voir les chaînes de caractères de sa propre langue.  
Ces chaines de caractères sont stockées sous ```resources/lang```, il y en a deux types :
* Celles listées dans des fichier json comme ```fr.json``` sont de simples transpositions version anglaise -> version française
* Celles listées dans des fichiers php comme ```blogebm.php``` dans les dossiers fr et en, qui fonctionnent par correspondance {mot clé} -> {chaine de caractères}, de plus ces versions peuvent être "à trou" où des mots seront remplacés selon le contexte.
    * Par exemple ```{{ __('blogebm.last_updated_on', ['date' => $article->updated_at->format('d/m/Y')]) }}``` de la vue ```article/edit.blade.php``` fait appel à cette chaine ```'dernière mise à jour le :date'``` en remplaçant ```:date``` par le paramètre passé.
    
##### Cas d'une règle de validation complexe

Dans certains cas, les règles de validation proposées par Laravel ne sont pas suffisantes contrairement au cas vu dans la partie Validation.  
Par exemple, quand on met à jour l'ordre des articles, on ne veut pas que la requête modifie l'ordre de paragraphes d'articles différents ou que les ordres ne soient pas des nombres consécutifs.  
Ainsi dans ```app/Http/Requests/OrderParagraphRequest```, on remarque l'apparition de deux règles non standards ```is_order_list_valid``` et ```is_part_of_article```.  
Ces règles sont déclarées au fournisseur de service de l'application sous ```app\Providers\AppServiceProvider```.  
Les deux y sont déclarées sous cette forme :
```
Validator::extend('is_part_of_article', 'App\Validators\IsPartOfArticle@validate');
Validator::extend('is_order_list_valid', 'App\Validators\IsOrderListValid@validate');
```  
On remarque alors que la logique de ses règles de validation est stockée sous ```App\Validators```.

#### Présentation de l'API

L'API est pensée RESTful, on réalise donc des opérations CRUD sur 2 resources : Les articles et les paragraphes.
Voici une description des différentes routes définies pour cette application :
* La route ```home``` => Requête GET sur ```/``` ou ```/articles``` : Page d'accueil
* La route ```article.show``` => Requête GET sur ```/articles/{id}``` avec ```id``` l'id de l'article : Page de lecture d'un article
* La route ```article.edit``` => Requête GET sur ```/articles/{id}/edit``` : Page d'édition d'un article
* La route ```article.create``` => Requête GET sur ```/articles/create``` : Page de création d'un article
* La route ```article.store``` => Requête POST sur ```/articles``` : Stockage d'un nouvel article
* La route ```article.update``` => Requête PATCH sur ```/articles/{id}``` : Mise à jour d'un article (titre, sommaire), non utilisé
* La route ```article.destroy``` => Requête DELETE sur ```/articles/{id}``` : Suppression d'un article
* La route ```paragraph.store``` => Requête POST sur ```/articles/{id}/paragraphs``` : Stockage d'un nouveau paragraphe
* La route ```paragraph.order``` => Requête non-CRUD PATCH sur ```/articles/{id}/paragraphs``` avec ```id``` l'id de l'article : Réorganisation des paragraphes d'un article
* La route ```paragraph.update``` => Requête PATCH sur ```/articles/{article_id}/paragraphs/{paragraph_id}```  : Mise à jour d'un paragraphe
* La route ```paragraph.destroy``` => Requête DELETE sur ```/articles/{article_id}/paragraphs/{paragraph_id}```  : Suppression d'un paragraphe


### Front-End

#### Points d'entrées

Tout d'abord, comme on peut le voir dans la vue ```template``` dont dérive les autres, le script ```common.js``` y est appelé.  
Il s'agit simplement dans ce fichier d'importer Bulma et la feuille de style commune du site (trouvables dans le dossiers ```resources``` également).  
La page de création d'article a pour script principal ```articleCreator.js``` et la page d'édition d'article a pour script principal ```articleEditor.js```.

#### Toolboxes

D'autres scripts gravitent autour de ces deux scripts principaux :
* ```toolbox.js``` contient des fonctions de base remplaçant leurs homologues bien utiles en ```jQuery```.
* ```ajax.js``` contient des fonctions permettant de préparer simplement des requêtes Ajax.
* ```draggingToolbox.js``` contient des fonctions relatives au Drag and Drop.

#### Paragraphs managers

* ```paragraphsCreator.js``` contient la logique derrière la création d'un paragraphe (quand on appuie sur le bouton "Ajouter un paragraphe")
* ```paragraphsFormatter.js``` contient la logique de création d'éléments du DOM (les textareas et paragraphes)

#### Fonctionnement du Drag and Drop

Le code est plutôt bien commenté, je vais uniquement m'attarder sur l'explication de l'architecture derrière le Drag and Drop sans jQuery.  
On explique donc ici le contenu du fichier ```draggingToolbox.js```.
* Les éléments HTML deviennent glissables (draggable) simplement en leur fournissant l'attribut ```draggable=true``` dans leur balise.
* On écoute l'évènement ```dragstart``` pour remarquer quand l'utilisateur souhaite faire glisser un élément glissable
* On ajoute à l'évènement attrapé des informations (ici on donne l'id de l'élément déplacé pour le retrouver quand on va déclencher l'évènement de drop)
* On crée des zones de drop pour l'élément, il s'agit de divs dont on va écouter l'évènement ```drop```
* Quand un div reçoit l'évènement ```drop```, on demande au navigateur de remplacer l'élément ayant subi le ```drop``` par l'élément ayant été glissé (référencé par son id dans l'évènement)
* On supprime toutes les autres zones de drop (quand l'évènement ```dragend``` est déclenché)
* Notre élément a bien été déplacé
* (L'évènement ```dragover``` est simplement là pour gérer l'animation)

## Améliorations possibles

* Permettre la modification du titre et du résumé d'un article
* Limiter le nombre d'articles postés par un seul utilisateur pour éviter le spam (surtout que n'importe qui peut s'inscrire)
* Permettre le déplacement de paragraphes en création d'article
* Créer un rôle administrateur pouvant supprimer n'importe quel article
* Faire apparaitre des messages d'erreur quand les requêtes échouent (sous les champs concernés), actuellement les erreurs sont affichées dans la console pour montrer qu'il serait facile de les utiliser
* Ajouter des messages de validation plus précis sur la nature des erreurs rencontrées (cela se fait de la même façon que les fichiers de traduction)