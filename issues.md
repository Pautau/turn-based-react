# Problèmes rencontrés

## Double impression des `consoles.log`
**Description**: Lors d'un deboggage, les consoles.logs étaient affichés en double et je pensais donc que mes éléments étaient chargés deux fois ce qui allait réduire la performance du site.

**Identification**: Cette double impression provenait du `<React.StrictMode>` situé dans `index.js`, c'est néanmoins important de le laisser activer car il aide à détecter les problèmes et donc fournir un code de plus grande qualité

**Résolution**: Le laisser activer malgré les doubles impressions.


## Cannot read properties of `undefined` (reading `'value'`)
**Objet concerné** : `{ "name": "Slash", "effect": { "type": "damage", "value": 15 }, "cooldown": 0 }`

**Description**: 
1. Lors d'une tentative d'affichage du *nom* et de la *valeur* du dernier sort utilisé `{player.lastSpell.name}` ne renvoit pas d'erreur alors que `{player.lastSpell.effect.value}` en renvoit une. 
2. Je pense que cela vient du fait qu'au tout premier tour, aucun sort n'est lancé mais en suivant cette logique `{player.lastSpell.name}` n'aurait pas fonctionné non plus.

**Identification**: L'erreur provient bien du fait que l'objet est vide au départ, l'accès à `{player.lastSpell.name}` fonctionne car sa valeur est `undefined` mais tenter d'accéder à une propriété d'une valeur `undefined` causera une erreur, d'où le fait que `{player.lastSpell.effect.value}` n'est pas la bonne manière pour afficher la valeur du sort.

**Résolution**: Ajouter un `?` à `{player.lastSpell.effect?.value}` permet de dire au code d'accèder uniquement à `"value"` si `{player.lastSpell.effect}` est défini, empêchant donc à l'application de planter.

