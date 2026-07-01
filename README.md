# Ghost Arena — Site web (refonte)

Refonte moderne, dynamique et haut de gamme du site **ghostarena.fr**.
Site statique multipage (HTML / CSS / JS — aucune dépendance, aucun build).

## 🥋 Pages (organisation et titres conservés)

| Fichier | Page | URL d'origine |
|---|---|---|
| `index.html` | Accueil — « You win or you learn » | `/` |
| `ghost-arena.html` | Ghost Arena (présentation, horaires, accès 7j/7) | `/ghost-arena/` |
| `coachs.html` | Coachs (8 coachs) | `/coachs/` |
| `planning-tarifs.html` | Planning & Tarifs | `/planning-tarifs/` |
| `fight-acces.html` | Fight Access | `/fight-acces/` |
| `only-ladies.html` | Only Ladies | `/only-ladies/` |
| `evenements.html` | Événements | `/evenements/` |
| `contact.html` | Contact + formulaire d'essai gratuit | `/contact/` |

## 🎨 Direction artistique

- **Couleurs reprises à l'identique** du site existant : rouge `#bc2b2b` / `#dd0000` / `#a90707`, noir `#0a0a0a`, blanc `#ffffff`, gris `#efefef` / `#32373c`.
- **Typographie « sport »** : `Anton` (titres H1 explosifs), `Oswald` condensé (labels), `Inter` (corps de texte premium).
- **Thème sombre cinématographique** avec grain de film, dégradés rouges et photos désaturées — pour l'effet haut de gamme.

## ⚡ Animations dynamiques

- **H1 cinétiques** : révélation par mots avec masque + skew (au chargement / au scroll).
- **Reveals au scroll** via IntersectionObserver (respecte `prefers-reduced-motion`).
- **Compteurs animés**, **marquee** de disciplines, **parallax** léger, header rétractable.
- **Hero « vidéo »** : montage cinématique (Ken Burns + crossfade + balayage lumineux) construit à partir de vos vraies photos. Voir la note vidéo ci-dessous.

## 🔍 SEO

- `<title>` + `meta description` uniques et optimisés par page (mots-clés : *MMA Genas*, *jiu jitsu Lyon*, *salle de sport Genas*…).
- Open Graph / Twitter Card, `canonical`, `lang="fr"`.
- **Données structurées JSON-LD** `SportsActivityLocation` (adresse, horaires, téléphone, réseaux) sur l'accueil.
- `sitemap.xml` + `robots.txt`, alt text sur les images, hiérarchie de titres propre, HTML sémantique.

## 🎬 Note sur la vidéo du hero

Le site existant ne contenait **aucun fichier vidéo** — uniquement des photos.
Le hero d'accueil est donc un **montage vidéo rendu dans le navigateur** à partir de vos photos
(zoom lent, fondus enchaînés, grain, balayage de lumière + titre animé). Il « joue » comme une
vidéo en boucle, se charge instantanément et n'utilise que vos visuels authentiques.

➡️ **Pour une vraie vidéo .mp4** (recommandé à terme) : fournissez quelques rushs (clips
d'entraînement MMA/JJB de 3–8 s). On les monte en boucle de 15–20 s et on remplace le montage
CSS par une balise `<video autoplay muted loop playsinline>` — le reste du design est déjà prêt.

## 🚀 Mise en ligne

C'est un site statique : déposez le contenu du dossier `site/` sur n'importe quel hébergement
(Netlify, Vercel, OVH, o2switch, hébergeur WordPress en remplaçant le thème…).

Test en local :

```bash
cd site
python3 -m http.server 8000
# puis ouvrez http://localhost:8000
```

### Formulaire de contact
Le formulaire valide les champs côté client et affiche une confirmation (démo). Pour recevoir
réellement les messages, branchez-le sur **Formspree**, **Netlify Forms** ou votre back-office
(le `<form id="contact-form">` est prêt à recevoir un `action`/endpoint).

## 📁 Structure

```
site/
├── index.html · ghost-arena.html · coachs.html · planning-tarifs.html
├── fight-acces.html · only-ladies.html · evenements.html · contact.html
├── css/styles.css        ← design system complet
├── js/main.js            ← header/footer, animations, formulaire
├── assets/
│   ├── img/              ← logo, photos salle, plannings, flyers events
│   └── coaches/          ← photos des 8 coachs
├── robots.txt · sitemap.xml
```
