# Blogebm

Une incroyable application pour gérer des articles.

# Installation

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

# Utilisation

* Déployé en développement, le site contient déjà quelques articles créé par l'utilisateur "EBM"
    * Pour se connecter au nom de cet utilisateur :
        * Email : EBM@EBM.ebm
        * Password : hamzaoutai
* Pour écrire un article, il suffit de se connecter avec un compte, il est possible d'en créer de nouveaux.
* Pour modifier des articles, il faut se connecter avec le compte de la personne ayant écrit l'article.
* En mode édition d'articles, il est possible de glisser-déposer les paragraphes d'un article pour le ré-arranger.
    * Ce n'est possible que si aucun paragraphe n'est en cours d'édition.
    
# Authors

Lenophie & MaxouLégal

# Licence

MIT