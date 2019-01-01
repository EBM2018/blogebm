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

