#Notifications
##Définition
Sont appelés ici 'notifications' les messages d'information affichés à l'utilisateur de l'application, généralement en haut de l'écran, pour lui indiquer le résultat d'une action effectuée.

Par exemple l'utilisateur sera averti qu'un email a bien été envoyé ou que le mot de passe qu'il vient de taper ne correspond pas à celui attendu.
  
Il y a deux façons de déclencher l'affichage d'une notification :
- depuis le serveur : l'application stocke un message dans une variable de session afin qu'il soit affiché sous forme de notification au chargement de la prochaine page, 
- directement depuis le front : l'utilisateur effectue une action qui déclenche la notification, sans repasser par le serveur.
  
##Fonctionnement
###Notifications via la session
Prenons un exemple afin d'expliquer le cheminement de ce type de notifications.

Imaginons qu'en souhaitant se connecter, un utilisateur remplisse correctement le formulaire de login et le soumette.
Côté serveur, les données étant valides, cet utilisateur est bien reconnu par l'application qui le redirige, disons vers sa page de profil.
Afin de lui signifier que l'opération de connexion s'est bien déroulée, nous voulons qu'il puisse voir une notification de succès à l'affichage de sa page de profil. 

Dans le contrôleur qui va renvoyer le template de la page de profil, nous créons le message de succès à afficher :
`$session->getFlashBag()->add('success', 'Vous vous êtes bien connecté');`

*A noter : dans un contrôleur qui étend la classe `Controler` de Symfony, on peut utiliser le raccourci suivant :
`$this->addFlash('success', 'Vous vous êtes bien connecté');`*

`flashBag` est une [fonctionnalité apportée par Symfony](https://symfony.com/doc/current/components/http_foundation/sessions.html).
Il est intéressant de noter que le terme 'success' n'est pas imposé, nous aurions tout aussi bien pu écrire 'super duper cool'.
Ce premier paramètre est utilisé pour regrouper un ensemble de messages ayant un rapport entre eux sous un même label, par exemple tous les messages de succès, tous les messages d'erreur, tous les messages informatifs, etc.

Nous avons donc besoin d'un template qui accueille ces messages afin de les afficher ultérieurement à l'utilisateur.
C'est le fichier template partial [notifications.html.twig](../src/AppBundle/Resources/views/partials/notifications.html.twig) qui va jouer ce rôle.
Afin d'avoir accès aux messages de n'importe où, peu importe la page chargée, il est inclu directement dans le fichier [layout global](../src/AppBundle/Resources/views/layout.html.twig) de l'application.

*A noter : le fichier [notifications.html.twig](../src/AppBundle/Resources/views/partials/notifications.html.twig) n'affiche pas les messages. Il ne sert qu'à stocker les informations relatives à chacun d'eux via des data-attributes : le type ('error', 'success') et le texte du message lui-même. En effet, l'intérêt principal d'une notification est qu'elle permet d'attirer l'attention de l'utilisateur tout en ne polluant pas le contenu principal.*  

Notre page profil est désormais chargée, et grâce au système de layout, nous savons qu'elle contient le partial stockant au moins un élément `<div>` qui lui-même contient le message de succès à afficher.  

Au chargement de chaque page, la fonction `displayNotifications()` du fichier javascript [Notification.js](../src/AppBundle/Resources/public/js/mardizza/Notification.js) est appelée.
(Le fichier [main.js](../src/AppBundle/Resources/public/js/main.js) appelle `mardizzaInit()` qui appelle `Notification.init()` qui appelle `displayNotifications()`) . 

Nous stockons ici les messages et leurs types dans une collection jquery et appelons pour chacun de ses éléments la fonction `create()` déclarée dans le fichier [Notification](../src/AppBundle/Resources/public/js/ui/Notification.js) du framework 'Mardizza UI Kit' conçue précisément pour afficher une notification à l'utilisateur.
*A noter : les différents types de notifications possibles définies dans le framework sont 'success', 'info', 'warning' et 'info'* 

###Notifications directes
Le comportement est ici beaucoup plus simple puisqu'il s'agit d'afficher une notification directement depuis l'interface front, sans repasser par le serveur.

Pour créer une telle notification, il suffit d'appeler la fonction `create()` déclarée dans le fichier [Notification](../src/AppBundle/Resources/public/js/ui/Notification.js), comme vu dans la partie précédente.

*A noter : il peut être intéressant ici de lui passer `true` comme troisième argument afin de rendre la notification 'sticky', c'est à dire que cette dernière restera affichée tant que l'utilisateur n'aura pas cliqué dessus.*
