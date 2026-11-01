# Neotech-Consulting — site web

Site vitrine statique (HTML / CSS / JS) pour Neotech-Consulting.

## Structure

- `index.html` — page publique
- `styles.css` / `script.js` / `portfolio.js` — styles, i18n FR/EN, rendu du portfolio
- `data/portfolio.json` — catalogue des projets (source de vérité publiée)
- `admin/` — interface d'administration du portfolio
- `images/` — assets

## Admin portfolio

Ouvrir `/admin/` (en local : `admin/index.html`).

1. Se connecter avec le mot de passe `neotech-admin` (à changer avant la prod — hash SHA-256 dans `admin/admin.js`).
2. Ajouter / modifier / supprimer des projets et des thématiques.
3. **Prévisualiser** ouvre le site avec le brouillon local (`?preview=1`).
4. **Exporter JSON**, remplacer `data/portfolio.json`, puis commit / déployer.

Les modifications admin sont stockées dans le navigateur (`localStorage`) tant que le JSON n’a pas été publié dans le dépôt.

## Lancer en local

Servir le dossier à la racine (nécessaire pour charger `data/portfolio.json`) :

```bash
python3 -m http.server 8080
```

Puis ouvrir `http://localhost:8080/` et `http://localhost:8080/admin/`.
