# Rafik Al Mouslim — politique de confidentialité

Site public indépendant du projet Android. Ce dépôt contient uniquement les textes de confidentialité, leur générateur et les fichiers statiques du site. Aucun code Android, texte religieux, base de données, identifiant publicitaire de production ou secret n’y est nécessaire.

Site : https://anaitmessaoud.github.io/rafik-al-mouslim-privacy/

Contact public : capitech92@gmail.com

## Langues et adresses

| Langue | Politique |
| --- | --- |
| Français | https://anaitmessaoud.github.io/rafik-al-mouslim-privacy/fr/ |
| English | https://anaitmessaoud.github.io/rafik-al-mouslim-privacy/en/ |
| العربية | https://anaitmessaoud.github.io/rafik-al-mouslim-privacy/ar/ |

La racine affiche la politique française complète et propose les trois langues. Aucune connexion, aucun JavaScript et aucune redirection automatique ne sont nécessaires. L’arabe utilise une mise en page RTL. Les pages n’ajoutent ni publicité, ni formulaire, ni outil de mesure d’audience, ni cookie du développeur ; les traitements techniques de GitHub sont expliqués dans la politique.

## Mise à jour

Node.js suffit, sans installation de dépendances :

```sh
node scripts/build.mjs
node scripts/validate.mjs
git diff --check
```

Modifier les textes dans `content/*.json`, mettre à jour la date et régénérer les fichiers HTML. Le style commun et l’icône sont dans `docs/styles.css` et `docs/icon.svg`.

Le validateur vérifie les quatre pages : langue, direction, nom de l’application, dix rubriques, contact, ancres, liens locaux, alternatives linguistiques et absence de scripts, formulaires, contenus intégrés ou redirections. Il ne remplace ni une revue juridique ni la déclaration Sécurité des données de Google Play.

## Publication GitHub Pages

Source prévue : branche `main`, dossier `/docs`, HTTPS activé. Les fichiers HTML générés sont suivis par Git ; aucun serveur applicatif ni service payant n’est requis. Un push sur `main` déclenche la publication.

La même URL doit être ajoutée dans l’application et dans Play Console. La publication du site ne configure pas les déclarations Play Console ni les réglages AdMob/UMP.

## Base de rédaction — 20 septembre 2026

La politique correspond à l’état inspecté de Rafik Al Mouslim : trois langues, contenus religieux disponibles hors ligne, préférences et favoris locaux, progression de lecture et d’adhkâr locale, position de premier plan pour les prières et la qibla, géocodage Android facultatif, notifications et alarmes locales, sauvegarde automatique et transfert entre appareils désactivés, Google Mobile Ads 25.4.0 et UMP 4.0.0.

La documentation publique Google consultée décrit actuellement Google Mobile Ads 25.5.0, tandis que l’application utilise 25.4.0. Les réglages réalisés dans AdMob/UMP et Play Console ne sont pas vérifiables depuis ce dépôt. Toute évolution des SDK, ajout de compte, serveur, analytique, médiation publicitaire, export/sauvegarde ou changement de traitement impose une révision des trois textes.

Sources officielles :

- [Google Play — Données utilisateur](https://support.google.com/googleplay/android-developer/answer/10144311?hl=fr)
- [Google Mobile Ads — Données collectées](https://developers.google.com/admob/android/privacy/play-data-disclosure)
- [Google UMP — Android](https://developers.google.com/admob/android/privacy)
- [Android — Sauvegarde automatique](https://developer.android.com/identity/data/autobackup)
- [Google — Confidentialité](https://policies.google.com/privacy)
- [Google — Applications partenaires](https://policies.google.com/technologies/partner-sites)
- [Google — Conservation](https://policies.google.com/technologies/retention)
- [GitHub — Confidentialité](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement)
- [GitHub Pages — Configuration de la source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
